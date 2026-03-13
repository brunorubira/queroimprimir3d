# Fase 4: Core Flow — Solicitações, Propostas e Pedidos

## Módulo 1 — Solicitações (Requests / Leads)

### Backend
- [x] Criar módulo `RequestsModule` (Controller e Service)
- [x] Implementar `POST /requests` — cliente cria solicitação (com mock de anexo de arquivo)
- [x] Implementar `GET /requests/my` — listar solicitações do próprio cliente
- [x] Implementar `GET /requests` — listar todas as solicitações `OPEN` para o Marketplace do Hub
- [x] Implementar `GET /requests/:id` — exibir detalhes do Lead

### Frontend
- [x] Criar [app/dashboard/client/new-request/page.tsx](file:///C:/Users/bruno/.gemini/antigravity/scratch/queroimprimir3d/apps/frontend/src/app/dashboard/client/new-request/page.tsx) com formulário completo
- [x] Atualizar [app/dashboard/client/page.tsx](file:///C:/Users/bruno/.gemini/antigravity/scratch/queroimprimir3d/apps/frontend/src/app/dashboard/client/page.tsx) para listar as solicitações abertas do cliente (integrar com `/requests/my`)
- [x] Atualizar [app/dashboard/provider/page.tsx](file:///C:/Users/bruno/.gemini/antigravity/scratch/queroimprimir3d/apps/frontend/src/app/dashboard/provider/page.tsx) para listar `GET /requests` com dados reais (Marketplace)

---

## Módulo 2 — Propostas (Proposals / Orçamentos)

### Backend
- [x] Criar módulo `ProposalsModule`
- [x] Implementar `POST /proposals` — hub envia orçamento (preço, prazo) para um `requestId`
- [x] Implementar `GET /proposals/request/:id` — listar propostas recebidas num request específico
- [x] Implementar `GET /proposals/my` — listar orçamentos enviados pelo hub

### Frontend
- [x] Atualizar `app/dashboard/provider/leads/[id]/page.tsx` para realizar o `POST /proposals` no botão Enviar Orçamento
- [x] Criar `app/dashboard/client/requests/[id]/page.tsx` (ou modal) para o cliente ver e analisar propostas recebidas

---

## Módulo 3 — Aceite e Pedidos (Orders)

### Backend
- [x] Criar módulo `OrdersModule`
- [x] Implementar `POST /orders/accept-proposal/:proposalId`
  - Criar order status `CREATED`
  - Atualizar status da proposal para `ACCEPTED`
  - Atualizar status do request para `MATCHING`
- [x] Implementar `GET /orders/my` (Client: serviços contratados / Provider: trabalhos a imprimir)

### Frontend
- [ ] Adicionar botão "Aceitar Proposta" na visualização do Cliente
- [ ] Criar [app/dashboard/client/orders/page.tsx](file:///C:/Users/bruno/.gemini/antigravity/scratch/queroimprimir3d/apps/frontend/src/app/dashboard/client/orders/page.tsx) — lista de impressões em andamento
- [ ] Criar `app/dashboard/provider/orders/page.tsx` — pipeline de produção do hub
