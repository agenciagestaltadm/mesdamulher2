import { useState, useRef } from 'react';
import { FileSpreadsheet, AlertCircle, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { processDisparoFile, type ProcessResult } from '@/lib/excel-processing';
import { toast } from '@/components/ui/use-toast';
import { buildDisparoXlsxBlob, downloadBlob } from '@/lib/exports';

export function ImportDisparoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
      setProgress(0);
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(10); // Start progress

    try {
      // Simulate steps for better UX
      setTimeout(async () => {
        setProgress(30);
        try {
          const res = await processDisparoFile(file);
          setProgress(70);
          
          setTimeout(() => {
            setResult(res);
            setProgress(100);
            setIsProcessing(false);
            if (res.invalidRows.length === 0 && res.total > 0) {
               toast({ title: 'Sucesso', description: `${res.validRows.length} contatos processados com sucesso.` });
            } else if (res.total > 0) {
               toast({ title: 'Atenção', description: `Processado com ${res.invalidRows.length} erros.`, variant: 'destructive' });
            }
          }, 500);
        } catch (err) {
          toast({ title: 'Erro', description: err instanceof Error ? err.message : 'Falha ao processar arquivo', variant: 'destructive' });
          setIsProcessing(false);
          setProgress(0);
        }
      }, 500);
    } catch (err) {
       setIsProcessing(false);
    }
  };

  const handleDownloadValid = () => {
    if (!result || result.validRows.length === 0) return;
    const blob = buildDisparoXlsxBlob(result.validRows);
    downloadBlob(`disparo-processado-${new Date().toISOString().slice(0, 10)}.xlsx`, blob);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="outline">Importar Excel Disparo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importar e Processar Excel</DialogTitle>
          <DialogDescription>
            Faça upload de uma planilha (.xlsx, .csv) com as colunas <strong>name</strong> e <strong>phone</strong> para validação e formatação.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!file ? (
            <div
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:bg-muted/50 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Arraste o arquivo aqui ou clique para selecionar
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={reset} disabled={isProcessing}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {isProcessing && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Processando...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {!isProcessing && !result && (
                <Button className="mt-4 w-full" onClick={handleProcess}>
                  Processar Arquivo
                </Button>
              )}
            </div>
          )}

          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-green-500/10 p-3 text-center dark:bg-green-500/20">
                  <p className="text-xs font-medium text-green-700 dark:text-green-400">Válidos</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">{result.validRows.length}</p>
                </div>
                <div className={`rounded-lg border p-3 text-center ${result.invalidRows.length > 0 ? 'bg-destructive/10 border-destructive/20' : 'bg-muted'}`}>
                  <p className={`text-xs font-medium ${result.invalidRows.length > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>Inválidos</p>
                  <p className={`text-2xl font-bold ${result.invalidRows.length > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>{result.invalidRows.length}</p>
                </div>
              </div>

              {result.invalidRows.length > 0 && (
                <ScrollArea className="h-32 rounded-md border">
                  <div className="p-3 space-y-2">
                    {result.invalidRows.map((row, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-destructive">
                        <AlertCircle className="h-3 w-3 mt-0.5 shrink-0" />
                        <span>
                          Linha {i + 2}: <strong>{row.name}</strong> ({row.originalPhone}) - {row.error}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {result.validRows.length > 0 && (
                 <Button className="w-full gap-2" onClick={handleDownloadValid}>
                    <Download className="h-4 w-4" />
                    Baixar Lista Pronta
                 </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
