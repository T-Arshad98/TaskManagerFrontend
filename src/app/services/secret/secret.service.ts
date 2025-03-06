import { Injectable } from '@angular/core';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  private client = new SecretManagerServiceClient();

  async getSecretValue(name: string): Promise<string> {
    const [version] = await this.client.accessSecretVersion({
      name: `projects/404785636178/secrets/${name}/versions/latest`,
    });
    const payload = version.payload?.data?.toString();
    if (!payload) {
      throw new Error(`Secret ${name} not found or empty`);
    }
    return payload;
  }
}