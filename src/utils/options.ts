export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
  
export const colourOptions: readonly ColourOption[] = [
    { value: 'tech', label: 'Tech', color: '#00B8D9' },
    { value: 'dev-tools', label: 'Developer Tools', color: '#0052CC' },
    { value: 'ai', label: 'Artificial Intelligence', color: '#5243AA' },
    { value: 'ux', label: 'User Experience', color: '#FF5630' },
    { value: 'productivity', label: 'Productivity', color: '#FF8B00' },
    { value: 'marketing', label: 'Marketing', color: '#FFC400' },
];
  