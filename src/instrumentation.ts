export async function register() {
    const startCron = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/start-cron', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            console.error('Failed to start cron job');
          }
        } catch (error) {
          console.error('Error cron job:', error);
        }
    };
    startCron()
}