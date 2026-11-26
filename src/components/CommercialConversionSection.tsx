import { Calendar, CheckCircle2, FileText, MessageSquare } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { IMAGES, VEHICLE_IDENTITY } from '../data/gt3rsData';
import { ResilientImage } from './ResilientImage';

export type InquiryMode = 'proposal' | 'test-drive' | 'consultant';

interface CommercialConversionSectionProps {
  selectedMode: InquiryMode;
  onModeChange: (mode: InquiryMode) => void;
}

const MODE_CONFIG: Record<
  InquiryMode,
  { label: string; headline: string; cta: string; icon: typeof FileText }
> = {
  proposal: {
    label: 'Solicitar Proposta',
    headline: 'Receba uma apresentação demonstrativa de configuração.',
    cta: 'Registrar Solicitação Demonstrativa',
    icon: FileText,
  },
  'test-drive': {
    label: 'Agendar Test Drive',
    headline: 'Selecione a janela de interesse para experiência presencial demonstrativa.',
    cta: 'Registrar Agendamento Demonstrativo',
    icon: Calendar,
  },
  consultant: {
    label: 'Falar com Consultor',
    headline: 'Envie suas dúvidas técnicas sobre o Pacote Weissach.',
    cta: 'Enviar Mensagem Demonstrativa',
    icon: MessageSquare,
  },
};

export function CommercialConversionSection({
  selectedMode,
  onModeChange,
}: CommercialConversionSectionProps) {
  const [displayName, setDisplayName] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeConfig = MODE_CONFIG[selectedMode];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (displayName.trim().length < 2) {
      setErrorMsg('Informe um nome ou apelido fictício com pelo menos 2 caracteres.');
      return;
    }

    if (contactHandle.trim().length < 4) {
      setErrorMsg('Informe um canal de retorno demonstrativo válido (ex.: visitante@exemplo.edu).');
      return;
    }

    if (selectedMode === 'test-drive' && !preferredDate) {
      setErrorMsg('Selecione uma data demonstrativa desejada para o agendamento.');
      return;
    }

    setSubmitted(true);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setErrorMsg('');
    setDisplayName('');
    setContactHandle('');
    setPreferredDate('');
    setNotes('');
  };

  return (
    <section
      id="proposta"
      className="border-t border-white/10 bg-[#0E0F13] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 items-stretch">
          {/* Left: Final Vehicle Presentation */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-lg border border-white/10 bg-[#121419] overflow-hidden">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <ResilientImage
                src={IMAGES.rear}
                alt="Porsche 911 GT3 RS 2024 vista traseira no showroom"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#98A1AE]">
                  <span>{VEHICLE_IDENTITY.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{VEHICLE_IDENTITY.model}</span>
                  <span aria-hidden="true">·</span>
                  <span>{VEHICLE_IDENTITY.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{VEHICLE_IDENTITY.colorName}</span>
                </div>

                <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase text-balance">
                  Explore a próxima etapa do atendimento demonstrativo.
                </h2>

                <p className="mt-3 text-sm sm:text-base text-[#A8B0BC] leading-relaxed">
                  Unidade apresentada com Pacote Weissach, sistema de freios PCCB, rodas forjadas em
                  magnésio Satin Black e acabamento interno em Race-Tex.
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5 flex flex-wrap gap-3">
                {(Object.keys(MODE_CONFIG) as InquiryMode[]).map((modeKey) => {
                  const cfg = MODE_CONFIG[modeKey];
                  const Icon = cfg.icon;
                  const active = selectedMode === modeKey;
                  return (
                    <button
                      key={modeKey}
                      type="button"
                      onClick={() => {
                        onModeChange(modeKey);
                        setSubmitted(false);
                        setErrorMsg('');
                      }}
                      className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-xs font-medium transition-colors min-h-[42px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C] ${
                        active
                          ? 'border-[#F2C94C] bg-[#F2C94C] text-[#0A0A0C] font-semibold'
                          : 'border-white/15 bg-white/[0.03] text-[#D0D5DD] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Demonstrative Interest Form */}
          <div className="lg:col-span-6 rounded-lg border border-white/10 bg-[#121419] p-6 sm:p-8 flex flex-col justify-between">
            {submitted ? (
              <div className="flex flex-1 flex-col items-start justify-center space-y-4 py-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#F2C94C]/15 text-[#F2C94C] border border-[#F2C94C]/40">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white uppercase">
                  Solicitação demonstrativa registrada
                </h3>
                <p className="text-sm sm:text-base text-[#B2B8C2] leading-relaxed max-w-lg">
                  Simulação concluída para <strong className="text-white">{displayName}</strong> na
                  modalidade <strong className="text-white">{activeConfig.label}</strong> referente
                  ao {VEHICLE_IDENTITY.brand} {VEHICLE_IDENTITY.model} ({VEHICLE_IDENTITY.year}).
                </p>
                <p className="text-xs text-[#8E95A0]">
                  Nenhum dado foi transmitido para servidores externos ou bancos de dados. Esta
                  etapa funciona localmente para validação da experiência.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-2 inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-medium text-white hover:bg-white/10 min-h-[42px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C94C]"
                >
                  Realizar nova simulação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <p className="text-xs font-medium tracking-wider text-[#F2C94C] uppercase">
                    Atendimento Demonstrativo · {activeConfig.label}
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white">
                    {activeConfig.headline}
                  </h3>
                  <p className="mt-2 text-xs text-[#98A1AE] leading-relaxed">
                    Formulário demonstrativo para fins de teste. Utilize dados fictícios — não
                    insira CPF, telefone pessoal real ou informações financeiras.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="demo-name"
                    className="block text-xs font-medium text-[#D0D5DD] mb-1.5"
                  >
                    Nome ou identificação fictícia
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ex.: Visitante Demonstração"
                    required
                    className="w-full rounded-md border border-white/15 bg-[#0A0A0C] px-3.5 py-2.5 text-sm text-white placeholder:text-[#68707D] focus:border-[#F2C94C] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-contact"
                    className="block text-xs font-medium text-[#D0D5DD] mb-1.5"
                  >
                    E-mail ou identificador de teste
                  </label>
                  <input
                    id="demo-contact"
                    type="email"
                    value={contactHandle}
                    onChange={(e) => setContactHandle(e.target.value)}
                    placeholder="Ex.: teste@exemplo.local"
                    required
                    className="w-full rounded-md border border-white/15 bg-[#0A0A0C] px-3.5 py-2.5 text-sm text-white placeholder:text-[#68707D] focus:border-[#F2C94C] focus:outline-none"
                  />
                </div>

                {selectedMode === 'test-drive' && (
                  <div>
                    <label
                      htmlFor="demo-date"
                      className="block text-xs font-medium text-[#D0D5DD] mb-1.5"
                    >
                      Data demonstrativa preferencial
                    </label>
                    <input
                      id="demo-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      required
                      className="w-full rounded-md border border-white/15 bg-[#0A0A0C] px-3.5 py-2.5 text-sm text-white focus:border-[#F2C94C] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="demo-notes"
                    className="block text-xs font-medium text-[#D0D5DD] mb-1.5"
                  >
                    Observações de interesse (opcional)
                  </label>
                  <textarea
                    id="demo-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex.: Interesse em detalhes do sistema DRS, freios PCCB ou pacote Weissach."
                    className="w-full rounded-md border border-white/15 bg-[#0A0A0C] px-3.5 py-2.5 text-sm text-white placeholder:text-[#68707D] focus:border-[#F2C94C] focus:outline-none resize-none"
                  />
                </div>

                {errorMsg && (
                  <p
                    role="alert"
                    className="rounded-md border border-amber-400/40 bg-amber-400/10 px-3.5 py-2.5 text-xs text-amber-200"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#F2C94C] px-6 py-3.5 text-sm font-semibold text-[#0A0A0C] hover:bg-[#F5D36A] transition-colors min-h-[46px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {activeConfig.cta}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
