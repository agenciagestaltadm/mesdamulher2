import { useState, useMemo } from 'react';
import { courses, CourseCategory } from '@/data/courses';
import CourseCard from './CourseCard';
import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const categories: (CourseCategory | 'Todos')[] = ['Todos', 'Saúde', 'Empreendedorismo', 'Oficina', 'Curso', 'Palestra'];

const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState<CourseCategory | 'Todos'>('Todos');

  const filteredCourses = useMemo(() => {
    if (activeCategory === 'Todos') {
      return [...courses].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    }
    return courses
      .filter(course => course.categoria === activeCategory)
      .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  }, [activeCategory]);

  const tabs = useMemo(
    () =>
      filteredCourses.map((course, index) => {
        const labelDate = format(parseISO(course.data), "d MMM", { locale: ptBR });
        return {
          id: course.id,
          label: `${labelDate} · ${course.categoria}`,
          content: <CourseCard key={course.id} course={course} index={index} />,
        };
      }),
    [filteredCourses],
  );

  return (
    <section id="cursos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Programação Completa
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Cursos do <span className="text-gradient">Mês da Mulher</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Confira todos os cursos, oficinas e palestras disponíveis. 
              Use os filtros para encontrar o que mais combina com você.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-hero text-primary-foreground shadow-cta scale-105'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <AnimatedTabs tabs={tabs} className="w-full max-w-5xl" />
          </div>

          {/* Results Count */}
          <div className="text-center mt-8 text-muted-foreground">
            Exibindo <span className="font-semibold text-foreground">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'curso' : 'cursos'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
