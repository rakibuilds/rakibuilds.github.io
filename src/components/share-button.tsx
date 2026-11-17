'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { Share2, Link2, Check } from 'lucide-react';

type ShareButtonProps = {
  /** Page title, used in the share text. */
  title: string;
  /** Optional short description added to the share text. */
  text?: string;
  /** Optional URL. Relative paths are fine. Defaults to the current page. */
  url?: string;
  className?: string;
  /**
   * @deprecated The dropdown variant was removed; the button always renders
   * as a single row of icons. Kept so existing call sites still type-check.
   */
  variant?: 'menu' | 'inline';
  /** @deprecated No dropdown, so there is nothing to align. */
  align?: 'left' | 'right';
  /** @deprecated No dropdown trigger, so there is no label to set. */
  label?: string;
};

/* ---------- Brand icons (inline so there is no dependency on lucide brand icons) ---------- */

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ---------- Helpers ---------- */

/** Canonical origin, used to build absolute share URLs during prerender too. */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rakibuilds.github.io'
).replace(/\/+$/, '');

/** A store that never changes, so the client snapshot is read exactly once. */
const subscribe = () => () => {};

function resolveHref(url: string | undefined, pathname: string | null): string {
  const target = url ?? pathname ?? '/';
  if (/^https?:\/\//i.test(target)) return target;
  return `${SITE_URL}${target.startsWith('/') ? target : `/${target}`}`;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400';

const iconButtonClass = `inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-white/20 hover:text-white ${focusRing}`;

/* ---------- Component ---------- */

export function ShareButton({
  title,
  text,
  url,
  className = '',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  // Absolute, hydration-safe, and correct after client-side navigation.
  const href = resolveHref(url, pathname);

  // Client-only capability, read at hydration with no effect and no mismatch.
  const canNativeShare = useSyncExternalStore(
    subscribe,
    () => typeof navigator !== 'undefined' && typeof navigator.share === 'function',
    () => false
  );

  const shareText = text ? `${title}: ${text}` : title;

  const nativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text, url: href });
    } catch {
      // The person closed the share sheet. Nothing to do.
    }
  }, [title, text, href]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(href);
    } catch {
      // Fallback for browsers or contexts without the Clipboard API.
      const el = document.createElement('textarea');
      el.value = href;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }, [href]);

  const encodedUrl = encodeURIComponent(href);
  const socials = [
    {
      name: 'WhatsApp',
      Icon: WhatsAppIcon,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${href}`)}`,
    },
    {
      name: 'Facebook',
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'X',
      Icon: XIcon,
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      Icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className={`inline-block ${className}`}>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Share this page"
      >
        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            className={iconButtonClass}
            aria-label="Share using your device"
            title="Share using your device"
          >
            <Share2 size={18} />
          </button>
        )}
        <button
          type="button"
          onClick={copyLink}
          className={iconButtonClass}
          aria-label={copied ? 'Link copied' : 'Copy link'}
          title={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? <Check size={18} className="text-cyan-400" /> : <Link2 size={18} />}
        </button>
        {socials.map(({ name, Icon, href: shareHref }) => (
          <a
            key={name}
            href={shareHref}
            target="_blank"
            rel="noopener noreferrer"
            className={iconButtonClass}
            aria-label={`Share on ${name}`}
            title={`Share on ${name}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  );
}

export default ShareButton;
