"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting MVP Data Simulation...');
    const client = await prisma.user.upsert({
        where: { id: 'de396c29-8ae9-48ec-80e6-78a97c817dbd' },
        update: {},
        create: {
            id: 'de396c29-8ae9-48ec-80e6-78a97c817dbd',
            email: `client_${Date.now()}@test.com`,
            password: 'hashed-password-here',
            name: 'João Silva (Criador)',
            role: 'CLIENT',
        },
    });
    console.log(`Created Client: ${client.name}`);
    const providerUser = await prisma.user.create({
        data: {
            email: `provider_${Date.now()}@test.com`,
            password: 'hashed-password-here',
            name: 'TechPrint Hub',
            role: 'PROVIDER',
            provider: {
                create: {
                    bio: 'Especialistas em FDM e SLA de alta precisão.',
                    rating: 4.9,
                    isVerified: true,
                    printers: {
                        create: [
                            {
                                model: 'Prusa i3 MK3S+',
                                technology: 'FDM',
                                buildVolume: '250 x 210 x 210 mm',
                            }
                        ]
                    }
                }
            }
        },
        include: { provider: true }
    });
    console.log(`Created Provider: ${providerUser.name}`);
    const request = await prisma.request.create({
        data: {
            title: 'Engrenagem de Reposição - Drone RC',
            description: 'Preciso de 4 unidades de uma engrenagem pequena (aprox. 3cm) em PETG ou algum material resistente a impacto. Arquivo STL anexo. Alta resolução é desejável pois os dentes são pequenos.',
            status: 'MATCHING',
            clientId: client.id,
            attachments: {
                create: [
                    {
                        url: 'https://example.com/engrenagem.stl',
                        filename: 'engrenagem_v2.stl',
                        mimetype: 'application/sla',
                    }
                ]
            }
        }
    });
    console.log(`Created Request: ${request.title} with ID: ${request.id}`);
    const proposal = await prisma.proposal.create({
        data: {
            price: 145.50,
            deliveryDays: 3,
            description: 'Olá João! Avaliei seu arquivo STL. Para garantir a resistência mecânica dos dentes, recomendo impressão em ABS ou PETG com 100% de preenchimento. Custo final inclui frete local.',
            status: 'SENT',
            requestId: request.id,
            providerId: providerUser.provider.id,
        }
    });
    console.log(`Created Proposal for Request ID: ${request.id}`);
    const conversation = await prisma.conversation.create({
        data: {
            participants: {
                create: [
                    { userId: client.id },
                    { userId: providerUser.id }
                ]
            },
            messages: {
                create: [
                    {
                        content: 'Olá TechPrint! Vi que vocês fazem peças em PETG. Conseguem alta resolução nos dentes dessa engrenagem?',
                        senderId: client.id,
                    },
                    {
                        content: 'Olá João. Sim, utilizamos bico de 0.2mm para engrenagens pequenas. Fica com excelente precisão dimensional.',
                        senderId: providerUser.id,
                    }
                ]
            }
        }
    });
    console.log(`Created Conversation between ${client.name} and ${providerUser.name}`);
    console.log('\n=======================================');
    console.log('SIMULATION SUCCESSFUL!');
    console.log(`To test the Budget Approval page, access:`);
    console.log(`http://localhost:3000/dashboard/client/requests/${request.id}`);
    console.log('=======================================\n');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map