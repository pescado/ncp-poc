export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeInput(text: string): string {
  text = text.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}
