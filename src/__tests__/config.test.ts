export const sur_argentino_id = '004544b2-4001-4271-9855-fec4b6a6442a'
export const user1_id = '410544b2-4001-4271-9855-fec4b6a6442a'
export const { testApiHandler } = require('next-test-api-route-handler');
export const apiHandler = async (appHandler: any, method: string, headers: any, test: any) => {
    await testApiHandler({
      appHandler,
      requestPatcher(request: Request) {
        const keys = Object.keys(headers)
        keys.map((key: any) => {
          request.headers.set(key, headers[key])
        })
      },
      test: async ({ fetch }: { fetch: any }) => {
        const response = await fetch({ method: method });
        test(response)
      },
    });
  }