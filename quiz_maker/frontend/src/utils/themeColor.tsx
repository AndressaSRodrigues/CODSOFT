export default function getThemeColor(theme: string): string {
    const themeColors: Record<string, string> = {
        'Technology': 'blue',
        'Environment': 'green',
        'Literature': 'purple',
        'Cinema': 'red',
        'History': 'babyblue',
        'Geography': 'orange',
    };

    return themeColors[theme] || 'bg-neutral-400';
};
