export interface Service {
    _id?: string;  // ID généré par MongoDB (facultatif en cas d'ajout de service)
    name: string;
    category: 'Réparation' | 'Entretien' | 'Diagnostic';
    description?: string;
    price: number;
    estimatedDuration?: number;
    availability: boolean;
    piece?: string;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
