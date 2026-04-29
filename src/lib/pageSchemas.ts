import type { PageSlug } from "./siteContent";

export type FieldType = "text" | "textarea" | "image" | "video" | "url" | "richlist";

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  /** for richlist: schema of each item's fields */
  itemFields?: Field[];
}

export interface BlockSchema {
  key: string;
  title: string;
  description?: string;
  fields: Field[];
}

export interface PageSchema {
  slug: PageSlug;
  title: string;
  blocks: BlockSchema[];
}

export const PAGE_SCHEMAS: Record<PageSlug, PageSchema> = {
  home: {
    slug: "home",
    title: "Home",
    blocks: [
      {
        key: "hero",
        title: "Seção Hero",
        description: "Banner principal da home com headline e CTAs.",
        fields: [
          { key: "eyebrow", label: "Tag superior", type: "text" },
          { key: "title", label: "Título principal", type: "textarea" },
          { key: "subtitle", label: "Subtítulo", type: "textarea" },
          { key: "cta_primary_label", label: "Botão primário (texto)", type: "text" },
          { key: "cta_primary_url", label: "Botão primário (URL)", type: "url" },
          { key: "cta_secondary_label", label: "Botão secundário (texto)", type: "text" },
          { key: "cta_secondary_url", label: "Botão secundário (URL)", type: "url" },
          { key: "image", label: "Imagem do hero", type: "image" },
        ],
      },
      {
        key: "cta_footer",
        title: "CTA do rodapé",
        fields: [
          { key: "title", label: "Título", type: "text" },
          { key: "subtitle", label: "Subtítulo", type: "textarea" },
          { key: "button_label", label: "Botão (texto)", type: "text" },
          { key: "button_url", label: "Botão (URL)", type: "url" },
        ],
      },
    ],
  },
  fichas: {
    slug: "fichas",
    title: "Barty Fichas",
    blocks: [
      {
        key: "hero",
        title: "Hero",
        fields: [
          { key: "title", label: "Título", type: "textarea" },
          { key: "subtitle", label: "Subtítulo", type: "textarea" },
          { key: "cta_label", label: "Botão (texto)", type: "text" },
          { key: "cta_url", label: "Botão (URL)", type: "url" },
          { key: "image", label: "Imagem destaque", type: "image" },
        ],
      },
      {
        key: "features",
        title: "Lista de recursos",
        fields: [
          {
            key: "items", label: "Recursos", type: "richlist",
            itemFields: [
              { key: "title", label: "Título", type: "text" },
              { key: "description", label: "Descrição", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },
  eventos: {
    slug: "eventos",
    title: "Barty Eventos",
    blocks: [
      {
        key: "hero",
        title: "Hero",
        fields: [
          { key: "title", label: "Título", type: "textarea" },
          { key: "subtitle", label: "Subtítulo", type: "textarea" },
          { key: "cta_label", label: "Botão (texto)", type: "text" },
          { key: "cta_url", label: "Botão (URL)", type: "url" },
          { key: "image", label: "Imagem destaque", type: "image" },
        ],
      },
    ],
  },
  food: {
    slug: "food",
    title: "Barty Food",
    blocks: [
      {
        key: "hero",
        title: "Hero",
        fields: [
          { key: "title", label: "Título", type: "textarea" },
          { key: "subtitle", label: "Subtítulo", type: "textarea" },
          { key: "cta_label", label: "Botão (texto)", type: "text" },
          { key: "cta_url", label: "Botão (URL)", type: "url" },
          { key: "image", label: "Imagem destaque", type: "image" },
        ],
      },
    ],
  },
  ingressos: {
    slug: "ingressos",
    title: "Barty Ingressos",
    blocks: [
      {
        key: "hero",
        title: "Hero",
        fields: [
          { key: "title", label: "Título", type: "textarea" },
          { key: "subtitle", label: "Subtítulo", type: "textarea" },
          { key: "cta_label", label: "Botão (texto)", type: "text" },
          { key: "cta_url", label: "Botão (URL)", type: "url" },
          { key: "image", label: "Imagem destaque", type: "image" },
        ],
      },
    ],
  },
  planos: {
    slug: "planos",
    title: "Planos",
    blocks: [
      {
        key: "hero",
        title: "Hero",
        fields: [
          { key: "title", label: "Título", type: "textarea" },
          { key: "subtitle", label: "Subtítulo", type: "textarea" },
        ],
      },
    ],
  },
};