declare module "midtrans-client" {
  // ============================
  // Snap Class
  // ============================
  export class Snap {
    constructor(config: {
      isProduction: boolean;
      serverKey: string;
      clientKey?: string;
    });

    createTransaction(params: SnapTransactionParams): Promise<SnapTransactionResponse>;
  }

  // ============================
  // Snap Transaction Types
  // ============================
  export interface SnapTransactionParams {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    item_details?: Array<{
      id?: string;
      price: number;
      quantity: number;
      name: string;
    }>;
    customer_details?: {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
    };
    credit_card?: {
      secure?: boolean;
    };
    callbacks?: {
      finish?: string;
      error?: string;
      pending?: string;
    };
    [key: string]: any; // fallback
  }

  export interface SnapTransactionResponse {
    token: string;
    redirect_url: string;
  }
}
