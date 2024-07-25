declare global {
    interface Window {
        gameData: {
            userId: string;
            userName: string;
        };
        Telegram: {
            WebApp: {
                initDataUnsafe: {
                    user: {
                        id: string;
                        username: string;
                    };
                };
                expand: () => void;
                MainButton: {
                    text: string;
                    show: () => void;
                };
                onEvent: (event: string, callback: () => void) => void;
            };
        };
    }
}

export {};
