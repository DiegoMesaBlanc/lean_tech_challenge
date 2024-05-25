// 1. Modelo de Datos
interface Invoice {
	id: string;
	customerName: string;
	items: { description: string; price: number }[];
	totalAmount: number;
	retries?: number; // Contador de reintentos
}


// 2. Servicio de Firma y Estampado
class SigningService {
	public async signAndStamp(invoice: Invoice): Promise<string> {
		// Simula el retraso del servicio externo (7-10 minutos)
		await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 7000));
		return `signed-and-stamped-${invoice.id}`;
	}
}


// 3. Servicio de Almacenamiento
class StorageService {
	private storage: Map<string, string> = new Map();

	public store(signedInvoiceId: string, invoice: Invoice): void {
		this.storage.set(signedInvoiceId, JSON.stringify(invoice));
	}

	public retrieve(signedInvoiceId: string): string | undefined {
		return this.storage.get(signedInvoiceId);
	}
}


// 4. Cola de Mensajes
class MessageQueue {
	private queue: Invoice[] = [];

	public enqueue(invoice: Invoice): void {
		this.queue.push(invoice);
	}

	public dequeue(): Invoice | undefined {
		return this.queue.shift();
	}

	public isEmpty(): boolean {
		return this.queue.length === 0;
	}
}