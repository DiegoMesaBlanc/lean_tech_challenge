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


// 5. Procesador de Facturas
class InvoiceProcessor {
	private signingService: SigningService;
	private storageService: StorageService;
	private queue: MessageQueue;

	constructor(
		signingService: SigningService,
		storageService: StorageService,
		queue: MessageQueue
	) {
		this.signingService = signingService;
		this.storageService = storageService;
		this.queue = queue;
	}

	public async processQueue(): Promise<void> {
		while (!this.queue.isEmpty()) {
			const invoice = this.queue.dequeue();

			if (invoice) {
				try {
					const signedInvoiceId = await this.signingService.signAndStamp(invoice);
					this.storageService.store(signedInvoiceId, invoice);
					console.log(`Factura ${invoice.id} firmada y almacenada como ${signedInvoiceId}`);
				} catch (error) {
					console.error(`Error al procesar la factura ${invoice.id}:`, error);
					this.queue.enqueue(invoice); // Reintentar más tarde
				}
			}
		}
	}
}


// 6. Punto de Venta
class PointOfSale {
	private queue: MessageQueue;

	constructor(
		queue: MessageQueue,
	) {
		this.queue = queue;
	}

	public generateInvoice(customerName: string, items: { description: string; price: number }[]): Invoice {
		const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
		const totalAmount = items.reduce((total, item) => total + item.price, 0);
		const invoice: Invoice = { id, customerName, items, totalAmount };

		// Entregar copia física inmediata (simulación)
		console.log(`Factura física generada para ${customerName}:`, invoice);

		// Enviar a la cola para procesamiento asíncrono
		this.queue.enqueue(invoice);

		return invoice;
	}
}


// 7. Simulación del Sistema
async function main() {
	const signingService = new SigningService();
	const storageService = new StorageService();
	const messageQueue = new MessageQueue();
	const invoiceProcessor = new InvoiceProcessor(signingService, storageService, messageQueue);
	const pointOfSale = new PointOfSale(messageQueue);

	// Generar algunas facturas en el punto de venta
	pointOfSale.generateInvoice("Cliente 1", [
		{ description: "Producto A", price: 50 },
		{ description: "Producto B", price: 75 },
	]);

	pointOfSale.generateInvoice("Cliente 2", [
		{ description: "Producto C", price: 100 },
	]);

	// Procesar la cola de facturas
	await invoiceProcessor.processQueue();
}

main().catch(console.error);
