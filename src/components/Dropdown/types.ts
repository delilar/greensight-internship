export interface IDropdownProps {
  id: string;
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholderClass?: string;
}