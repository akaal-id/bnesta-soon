"use client";

import Image from "next/image";
import styles from "./Footer.module.css";
// 1. Import the specific social icons from lucide-react
import { 
  ChevronRight, 
  Mail, 
  MessageSquare, 
  Facebook, 
  Instagram, 
  Linkedin
} from "lucide-react";
import { EmailForm } from "@/components/EmailForm/EmailForm";

const quickLinks = ["Featured Villa", "Common Spaces", "Read Journal"];
const legalLinks = ["About BNesta", "Explore Gallery"];
const ctaLinks = [
  { Label: "BWork", url: "https://www.bwork.id" },
  { Label: "BFriends", url: "https://www.bfriends.id" },
  { Label: "BLive", url: "https://www.BLive.id" }
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ctaBar}>
        <span className="inline-flex items-center gap-4">
          Visit BLife Ecosystem
          <ChevronRight className="w-4 h-4" />
        </span>
        {ctaLinks.map((link) => (
          <a key={link.Label} href={link.url} className={styles.ctaLink} target="_blank" rel="noopener noreferrer">
            {link.Label}
          </a>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>
          <Image
            src="/images/logo/bnesta-logo.png"
            alt="BNesta logo"
            width={112}
            height={29}
            quality={100}
          />
          <p className={styles.address}>
            <a href="https://www.google.com/maps/place/BNesta/@-8.6749497,115.1732949,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd2475043efd497:0xc3b216db125d7e35!8m2!3d-8.6749497!4d115.1758698!16s%2Fg%2F11xp66zz1l?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D">
              Jl. Tunjung I, Kerobokan Kelod, Kec. Kuta Utara, Kabupaten Badung, Bali 80117
            </a>
          </p>
          <div className={styles.contact}>
            <a 
             href="https://instagram.com/bnesta.kerobokan"
             target="_blank" 
             rel="noopener noreferrer"
             className={styles.contactItem}
             >
             <Instagram className="w-4 h-4" />
             @bnesta.kerobokan
            </a>
            <a href="mailto:hello@bnesta.id"
              className={styles.contactItem}>
              <Mail className="w-4 h-4" />
              hello@bnesta.id
            </a>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h5 className={styles.newsletterTitle}>
            <em>Be part of the living journey that<span className="font-semibold"><br/>begins at BNesta</span></em>
          </h5>
          <div className={styles.inputRow}>
            <EmailForm
              placeholder="Enter your email"
              buttonLabel="Subscribe"
              className={styles.footerEmailForm}
              inputClassName={styles.footerEmailInput}
              buttonClassName={styles.footerSubmitButton}
            />
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.copyrightText}>
          2025 © BNesta Bali. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
