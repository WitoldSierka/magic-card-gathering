import Config from "./Config";

class HttpService {
    async makeHttpRequest(methodName: string, args?: Record<string, any>) {
        try {
            let path = `${Config.apiAddress}/${methodName}` + new URLSearchParams(args);
            const response = await fetch(path, {
              method: 'get',
              headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
              })
            });
            console.log("RESP", response);
            if (!response.ok) {
                return Promise.reject(response.statusText);
              }
          
              return response.json();
          } catch (error) {
            return Promise.reject(error);
          }
    }

    async getCardById(cardId: number) {
        return await this.makeHttpRequest(`cards/${cardId}`);
    }

    async findCardsByTypeAndColors(type: Array<string>, colorIdentity: Array<string>) {
        const args = {
            type,
            colorIdentity
        }
        return await this.makeHttpRequest("cards?", args);
    }

}

export default new HttpService();