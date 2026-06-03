// ✅ STRAN: POSAMEZNA PESEM (/pesmi/[slug])

import Link from "next/link";

type WpPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

async function getSongBySlug(slug: string): Promise<WpPost | null> {
  

const res = await fetch(
  `https://narodne-pesmi.si/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=id,slug,title,content`,
  {
    next: { revalidate: 3600 },
  }
);



  if (!res.ok) {
    throw new Error(`Napaka API: ${res.status}`);
  }

  const data: WpPost[] = await res.json();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return data[0];
}


export default async function SongDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; page?: string; sort?: string }>;
}) {


    const sp = await searchParams;
    
    const backUrl =
  "/pesmi" +
  (Object.keys(sp).length
    ? "?" + new URLSearchParams(sp as any).toString()
    : "");

  const { slug } = await params;
  const post = await getSongBySlug(slug);

  if (!post) {
    return (
        
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Pesem ne obstaja
        </h1>

        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Za slug <span className="font-medium">{slug}</span> ni bilo najdenega zapisa.
        </p>

        <Link
          href={backUrl}
          className="mt-6 inline-block rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          ← Nazaj na seznam pesmi
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href={backUrl}
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Nazaj na seznam pesmi
      </Link>

      <h1
        className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
     

        <article
        className="mx-auto max-w-xl text-center text-md leading-5 tracking-wide [&>p]:mb-5"
        dangerouslySetInnerHTML={{
            __html: post.content.rendered,
        }}
        />
    </div>
  );
}