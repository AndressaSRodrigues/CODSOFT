export default function getThemeColor(theme: string): string {
    const themeColors: Record<string, string> = {
        'Technology': 'bg-blue',
        'Environment': 'bg-green',
        'Literature': 'bg-purple',
        'Cinema': 'bg-red',
        'History': 'bg-babyblue',
        'Geography': 'bg-orange',
    };

    return themeColors[theme] || 'neutral-400';
};
