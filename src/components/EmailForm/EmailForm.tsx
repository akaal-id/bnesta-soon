"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Check } from "lucide-react";
import styles from "./EmailForm.module.css";

interface EmailFormProps {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdorwvIaO5JtvI-bf6_6mg2cYPgOhLdPbbV5woYFxLfkXbCEw/formResponse";
const ENTRY_ID = "entry.520712099";

export function EmailForm({
  placeholder = "Enter your email",
  buttonLabel = "→",
  className = "",
  inputClassName = "",
  buttonClassName = "",
}: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [error, setError] = useState(false);

  const hasAtSymbol = email.includes("@");
  const isValid = email.trim().length > 0 && hasAtSymbol;
  const isEmpty = email.trim().length === 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsTyping(value.length > 0);
    setError(false); // Don't show error while typing
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      setError(true);
      return;
    }

    setIsSubmitting(true);
    setError(false);

    try {
      // Submit to Google Forms
      const formData = new FormData();
      formData.append(ENTRY_ID, email);

      // Use fetch with no-cors mode for Google Forms
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // Show success message
      setIsSuccess(true);
      setIsSubmitting(false);

      // Start fade out after 4.5 seconds
      setTimeout(() => {
        setIsFadingOut(true);
        // Reset after fade out completes (0.5s)
        setTimeout(() => {
          setIsSuccess(false);
          setIsFadingOut(false);
          setEmail("");
          setIsTyping(false);
        }, 500);
      }, 4500);
    } catch (error) {
      console.error("Form submission error:", error);
      // Still show success (Google Forms doesn't return response in no-cors mode)
      setIsSuccess(true);
      setIsSubmitting(false);
      // Start fade out after 4.5 seconds
      setTimeout(() => {
        setIsFadingOut(true);
        // Reset after fade out completes (0.5s)
        setTimeout(() => {
          setIsSuccess(false);
          setIsFadingOut(false);
          setEmail("");
          setIsTyping(false);
        }, 500);
      }, 4500);
    }
  };

  const getInputState = () => {
    if (isSuccess) return "success";
    if (error) return "error";
    if (isTyping) return "typing";
    return "placeholder";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.emailForm} ${className} ${error ? styles.error : ""}`}
    >
      {isSuccess ? (
        <div className={`${styles.successMessage} ${isFadingOut ? styles.fadeOut : ""}`}>
          <Check className={styles.checkIcon} />
          <span>Successfully submitted your email!</span>
        </div>
      ) : (
        <>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${styles.emailInput} ${inputClassName} ${styles[getInputState()]} ${styles.fadeIn}`}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`${styles.submitButton} ${buttonClassName} ${
              isValid ? styles.enabled : ""
            } ${styles.fadeIn}`}
          >
            <span aria-hidden="true">{buttonLabel}</span>
            <span className={styles.srOnly}>Submit email</span>
          </button>
        </>
      )}
    </form>
  );
}

