import React, { useState } from 'react';
import { collection, addDoc} from "firebase/firestore";
import { db } from '../firebase';

const NewWebsite = () => {
  const [contactForm, setContactForm] = useState({ userName: '', email: '', message: '' });
  const [feedback, setFeedback] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "issues"), {
        name: contactForm.userName,
        email: contactForm.email,
        message: contactForm.message
      });
      console.log("Document written with ID: ", docRef.id);
      console.log('Contact form submitted:', contactForm);
      
      // Show alert to user
      alert("Message sent!");
      
      // Reset form after submission
      setContactForm({ userName: '', email: '', message: '' });
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error sending message. Please try again.");
    }
  };


  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
        const docRef = await addDoc(collection(db, "feedback"), {
            feedback:feedback
        })
        alert("Feedback sent")
    } catch (error) {
        console.error("Error adding document: ", e);
        alert("Error sending message. Please try again.");  
    }
    console.log('Feedback submitted:', feedback);
    // Reset feedback after submission
    setFeedback('');
  };

  return (
    <div className="support-page">
      <header className="support-header">
        <h1>Gig Fort Support</h1>
      </header>

      <section className="contact-info">
        <h2>Contact Information</h2>
        <p>Email: gigfort.nz@gmail.com</p>
        <p>Response Time: Within 1-3 days</p>
      </section>

      <section className="contact-form">
        <h2>Contact Form</h2>
        <form onSubmit={handleContactSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={contactForm.name}
            onChange={(e) => setContactForm({...contactForm, userName: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={contactForm.email}
            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
            required
          />
          <textarea
            placeholder="Message"
            value={contactForm.message}
            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      <section className="app-info">
        <h2>App Information</h2>
        <p>
          Discover Wellington's vibrant music scene with Gig Fort, the ultimate gig guide app for Aotearoa's cultural capital. Never miss a beat with our comprehensive, centralized platform designed to make finding live music effortless.
        </p>
        <p>Our intuitive map feature displays daily gigs, allowing you to explore events across the city at a glance. Customize your search by date, distance, start time, and genre to find the perfect show. Prefer a list view? Browse gigs by day or week with our sleek, user-friendly interface.</p>
        <p>Create an account to unlock social features inspired by your favorite apps. Save gigs, set reminders, and like events to curate your personal music calendar. Whether you're a local or a visitor, Gig Fort ensures you're always in tune with Wellington's diverse musical offerings.</p>
        <p>Say goodbye to scattered information and clunky interfaces. With Gig Fort, Wellington's dynamic music scene is just a tap away. Download now and let the music guide you!</p>
        <p>Version: 1.0.6</p>
      </section>

      <section className="privacy-policy">
        <h2>Privacy Policy</h2>
        <p>Our privacy policy can be found at: <a href="https://gig-fort-review.web.app/" target="_blank" rel="noopener noreferrer">https://gig-fort-review.web.app/</a></p>
      </section>

      <section className="terms-of-service">
        <h2>Terms of Service</h2>
        <p>
          By using Gig Fort, you agree to the following terms:
        </p>
        <ol>
          <li>Gig Fort provides information about music events in Wellington. While we strive for accuracy, we cannot guarantee the completeness or reliability of this information.</li>
          <li>Users must be 17 years or older to create an account.</li>
          <li>Users are responsible for maintaining the confidentiality of their account information.</li>
          <li>Gig Fort reserves the right to modify or discontinue the service at any time without notice.</li>
          <li>Users agree not to misuse the app's features or interfere with its functionality.</li>
          <li>Gig Fort is not responsible for any issues arising from attendance at events listed in the app.</li>
          <li>Users retain ownership of any content they submit, but grant Gig Fort a license to use, modify, and display that content within the app.</li>
          <li>Gig Fort may terminate or suspend accounts for violations of these terms or for any other reason.</li>
        </ol>
      </section>

      <section className="social-media">
        <h2>Social Media</h2>
        <p>Follow us on Instagram: <a href="https://www.instagram.com/gig.fort/" target="_blank" rel="noopener noreferrer">@gig.fort</a></p>
      </section>

      <section className="feedback">
        <h2>Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            placeholder="Your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Feedback</button>
        </form>
      </section>
    </div>
  );
};

export default NewWebsite;