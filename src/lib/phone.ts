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
