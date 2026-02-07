export const normalizePhoneForWhatsApp = (value: string) => {
  const digits = (value ?? '').replace(/\D/g, '');
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
  const ddd = Number(withCountry.slice(2, 4));
  const local = withCountry.slice(4);

  if (!Number.isFinite(ddd) || local.length === 0) return withCountry;

  const dddLabel = String(ddd).padStart(2, '0');
  const shouldStripLeadingNine = local.length === 9 && local.startsWith('9');

  if (ddd <= 27) return `55${dddLabel}${local}`;
  if (shouldStripLeadingNine) return `55${dddLabel}${local.slice(1)}`;
  return `55${dddLabel}${local}`;
};

export const applyPhoneMask = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';

  // Assume user is typing local number if not starting with 55
  // But be careful with editing.
  let clean = digits;
  if (!clean.startsWith('55')) {
    clean = `55${clean}`;
  }

  if (clean.length > 13) clean = clean.slice(0, 13);

  let formatted = `+${clean.slice(0, 2)}`;
  if (clean.length > 2) formatted += ` ${clean.slice(2, 4)}`;
  if (clean.length > 4) formatted += ` ${clean.slice(4, 9)}`;
  if (clean.length > 9) formatted += `-${clean.slice(9)}`;
  
  return formatted;
};
