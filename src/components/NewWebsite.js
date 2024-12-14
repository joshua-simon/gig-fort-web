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

      <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        JOSHUA SIMON MOBILE APPLICATION (GIG FORT) TERMS AND CONDITIONS
      </h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-bold">1 INTRODUCTION</h2>
        <div className="space-y-2">
          <p className="pl-4">(a) These terms and conditions (Terms) apply when you use this mobile application (App).</p>
          <p className="pl-4">(b) You agree to be bound by these Terms which form a binding contractual agreement between you and me, Joshua Simon (I, me or my).</p>
          <p className="pl-4">(c) If you don't agree to these Terms, you must refrain from using the App.</p>
          <p className="pl-4">(d) I may change these Terms at any time by updating this page of the App, and your continued use of the App following such an update will represent an agreement by you to be bound by the Terms as amended.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">2 ACCESS AND USE OF THE APP</h2>
        <p>
          You must only use the App in accordance with these Terms and any applicable laws, and must ensure that your employees, sub-contractors and any other agents who use or access the App comply with the Terms and any applicable laws.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">3 YOUR OBLIGATIONS</h2>
        <p>You must not:</p>
        <div className="space-y-2">
          <p className="pl-4">(a) copy, mirror, reproduce, translate, adapt, vary, modify, sell, decipher or decompile any part or aspect of the App without my express written consent;</p>
          <p className="pl-4">(b) use the App solely for the purpose of browsing and accessing information about gigs or events near your location;</p>
          <p className="pl-4">(c) use, or attempt to use, the App in a manner that is illegal or fraudulent or facilitates illegal or fraudulent activity;</p>
          <p className="pl-4">(d) use, or attempt to use, the App in a manner that may interfere with, disrupt or create undue burden on the App or the servers or networks that host the App;</p>
          <p className="pl-4">(e) use the App with the assistance of any automated scripting tool or software;</p>
          <p className="pl-4">(f) act in a manner that may harm or adversely impact my reputation, including by linking to or referencing the App in any other mobile application, website, or platform without my prior written consent; and</p>
          <p className="pl-4">(g) attempt to breach the security of the App, or otherwise interfere with the normal functions of the App, including by:</p>
          <div className="pl-8 space-y-2">
            <p>(i) gaining unauthorised access to App accounts or data;</p>
            <p>(ii) scanning, probing or testing the App for security vulnerabilities;</p>
            <p>(iii) overloading, flooding, mailbombing, crashing or submitting a virus to the App; or</p>
            <p>(iv) instigate, participate in, or facilitate a denial-of-service attack or any other activity that disrupts or interferes with the proper functioning of the App or its supporting infrastructure.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">4 INFORMATION ON THE APP</h2>
        <p>While I will use my reasonable endeavours to ensure the App is as up-to-date and accurate as possible, you acknowledge and agree that from time to time, you may encounter the following issues</p>
        <div className="space-y-2">
          <p className="pl-4">(a)	the App may have errors or defects;</p>
          <p className="pl-4">(b) the App may not be accessible at times;</p>
          <p className="pl-4">(c)	information you receive or supply through the App may not be secure or confidential; or</p>
          <p className="pl-4">(d) any information provided through the App may not be accurate or true.</p>
          <div className="pl-8 space-y-2">
            <p>I reserve the right to change any information or functionality on the App by updating the App at any time without notice, including product descriptions, prices and other App Content.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">5 INTELLECTUAL PROPERTY</h2>
        <div className="space-y-2">
          <p className="pl-4">(a)	I retain ownership of the App and all materials on the App (including but not limited to, text, graphics, logos, design, icons, images, sound and video recordings, pricing, downloads and software) (App Content). I reserve all rights to any intellectual property owned or licensed by us that are not expressly granted to you.</p>
          <p className="pl-4">(b) You may use the App and its content solely for personal, non-commercial purposes as permitted under these Terms. You must not otherwise reproduce, transmit, adapt, distribute, sell, modify or publish the App or any App Content without prior written consent from me or as permitted by law.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">6 LINKS TO OTHER APPS</h2>
        <div className="space-y-2">
          <p className="pl-4">(a) The App may contain links to third-party applications, websites or platforms that are not my responsibility. I do not monitor or have any control over the content or functionality of these linked third-party sources and I am not responsible or liable for any issues arising from your use of them.</p>
          <p className="pl-4">(b)	The inclusion of any third-party links on the App does not imply my approval, endorsement, or association with the linked applications, websites or platforms. </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">7 THIRD PARTY SERVICES</h2>
        <div className="space-y-2">
          <p className="pl-4">(a) The App incorporates Google Maps API services to provide location-based functionalities. By using the App, you acknowledge and agree that your use of Google Maps is subject to Google’s Terms of Service and Privacy Policy, which are available on Google’s website and which may be updated from time to time by Google.</p>
          <p className="pl-4">(b) The App may incorporate other third-party services, platforms, or APIs from time to time. By using the App, you acknowledge and agree that your interaction with these third-party services is governed by their respective terms of service and privacy policies. </p>
          <p className="pl-4">(c)	I do not own or control third-party services integrated into the App and are not responsible for their accuracy, reliability, availability, or functionality. Any reliance on these third-party services is at your own risk.</p>
          <p className="pl-4">(d)	Data collected through third-party services is subject to the privacy practices of the respective providers. I do not control or store data processed by these third-party services beyond what is necessary for the App’s operation and functionality.</p>
          <p className="pl-4">(e)	I am not liable for any interruptions, changes, or discontinuation of Google Maps services that may affect the functionality of the App.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">8 ANALYTICS</h2>
        <div className="space-y-2">
          <p className="pl-4">(a)	The App may incorporate Google Analytics or similar tools to collect, analyse, and report on user interactions with the App. By using the App, you acknowledge and agree that any data collected through these tools will be governed by the applicable terms and privacy policies of the respective service providers, including Google Analytics’ Terms of Service and Privacy Policy, which are available on Google’s website and which may be updated from time to time by Google.</p>
          <p className="pl-4">(b) The use of analytics tools is intended to improve the App’s functionality, performance, and user experience. Any data collected will be aggregated and anonymized where possible, and no personally identifiable information will be used without your consent, except as permitted by law. </p>
          <p className="pl-4">(c)	You may have the option to opt out of certain data collection practices where applicable by adjusting your device or browser settings or through the App’s privacy controls (if implemented).</p>
          <p className="pl-4">(d)	I am not responsible for the operation, accuracy, or privacy practices of Google Analytics or other third-party analytics services. Any reliance on analytics data is at your own risk.</p>
          <p className="pl-4">(e) I reserve the right to change, update, or discontinue the use of any analytics tools in the App at my sole discretion without prior notice.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">9 MONETISATION</h2>
        <div className="space-y-2">
         <p>I reserve the right to introduce monetisation features for the App at any time, including but not limited to in-app purchases, subscriptions, paid features, or other revenue-generating mechanisms. Any such features introduced will be subject to updates to these Terms and Conditions.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">10 SECURITY</h2>
        <div className="space-y-2">
         <p>I do not accept responsibility for loss or damage to computer systems, mobile phones, other electronic devices, or connected networks, arising from the use of the App. This includes, but is not limited to, damage caused by viruses, malware, malicious code, or other forms of interference. You should take your own precautions to ensure that the process that you employ for accessing the App does not expose you to risk of viruses, malicious computer code or other forms of interference.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">11 REPORTING MIUSE</h2>
        <div className="space-y-2">
         <p>If you become aware of misuse of the App by any person, any errors in the material on the App or any difficulty in accessing or using the App, please contact us immediately at gigfort.nz@gmail.com</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">12 PRIVACY</h2>
        <div className="space-y-2">
         <p>	You agree to be bound by my Privacy Policy, which can be found <a href = "https://www.gigfort.nz/privacy">here</a></p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">13 TERMINATION OF ACCOUNT</h2>
        <div className="space-y-2">
          <p className="pl-4">(a) I reserve the right to terminate or suspend your account at my sole discretion, without notice, if I believe that you have violated any part of these Term, including but not limited to engaging in fraudulent activity, misusing the App, or violating any applicable laws or regulations.</p>
          <p className="pl-4">(b) If I terminate or suspend your account, you will lose access to the App and any associated services. I may, at my discretion, remove or disable access to any content or data associated with your account. Upon termination, any data or content related to your account may be deleted from the systems, subject to applicable law.</p>
          <p className="pl-4">(c)	In the event of a breach or violation of the Terms, you may be notified of the termination or suspension of your account via email (if applicable), or within the App. If you believe the termination or suspension is in error, you may contact me.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">14 ACCOUNT DELETION</h2>
        <div className="space-y-2">
         <p>Users may request to delete their account by following the steps outlined in the App or contacting me. Upon deletion of the account, all associated personal data and information will be permanently deleted from the systems, subject to applicable legal requirements.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">15 LIABILITY</h2>
        <div className="space-y-2">
         <p>I make no warranties or representations about this App or any of its content and will not be responsible to you or any third party for any direct or consequential loss suffered in connection with the use of this App. To the maximum extent permitted by law, we each exclude each other from any liability that may arise due to your use of my App and/or the information or materials contained in the App.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">16 COMPLAINTS AND DISPUTE RESOLUTION</h2>
        <p>	If you have any complaints regarding your use of the App, please follow the process outlined below:</p>
        <div className="space-y-2">
          <p className="pl-4">(a)	Internal complaints process: if you wish to raise a complaint, please contact me using the contact details provided in the App, including your name and contact information. I will investigate your complaint promptly and aim to resolve it within a reasonable timeframe. My goal is to address and resolve your concerns as quickly as possible.</p>
          <p className="pl-4">(b)	Platform-specific complaints: if your complaint concerns an issue related to the App’s operation or performance, and you are not satisfied with the outcome of the internal process, you may follow the complaints procedure outlined by the relevant platform (Google Play or Apple App Store). These platforms have their own complaint handling mechanisms that I encourage you to use:</p>
          <p className="pl-4">(i) Google Play: <a href = 'https://play.google/developer-content-policy/'>Google Play Developer Policy Center</a></p>
          <p className="pl-4">(ii) Apple App Store: <a href = 'https://developer.apple.com/app-store/review/guidelines/'>Apple App Store Review Guidelines</a></p>
        </div>
      </section>          

      <section className="space-y-4">
        <h2 className="text-xl font-bold">17 GENERAL</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">17.1 GOVERNING LAW AND JURISDICTION</h3>
            <p className="mt-2">
              This agreement is governed by the law applying in New Zealand. Each party irrevocably submits to the exclusive jurisdiction of the courts of New Zealand and courts of appeal from them in respect of any proceedings arising out of or in connection with this agreement. Each party irrevocably waives any objection to the venue of any legal process on the basis that the process has been brought in an inconvenient forum.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">17.2 WAIVER</h3>
            <p className="mt-2">
              No party to this agreement may rely on the words or conduct of any other party as a waiver of any right unless the waiver is in writing and signed by the party granting the waiver.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">17.3 SEVERANCE</h3>
            <p className="mt-2">
            Any term of this agreement which is wholly or partially void or unenforceable is severed to the extent that it is void or unenforceable. The validity and enforceability of the remainder of this agreement is not limited or otherwise affected.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">17.4 JOINT AND SEVERAL LIABILITY</h3>
            <p className="mt-2">
            An obligation or a liability assumed by, or a right conferred on, two or more persons binds or benefits them jointly and severally.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">17.5 ASSIGNMENT</h3>
            <p className="mt-2">
            A party cannot assign, novate or otherwise transfer any of its rights or obligations under this agreement without the prior written consent of the other party.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">17.6 ENTIRE AGREEMENT</h3>
            <p className="mt-2">
            This agreement embodies the entire agreement between the parties and supersedes any prior negotiation, conduct, arrangement, understanding or agreement, express or implied, in relation to the subject matter of this agreement.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">17.7 INTERPRETATION</h3>
            <div className="space-y-2">
              <p className="pl-4">(a)	(singular and plural) words in the singular includes the plural (and vice versa);</p>
              <p className="pl-4">(b)	(gender) words indicating a gender includes the corresponding words of any other gender;</p>
              <p className="pl-4">(c)	(defined terms) if a word or phrase is given a defined meaning, any other part of speech or grammatical form of that word or phrase has a corresponding meaning;</p>
              <p className="pl-4">(d)	(person) a reference to “person” or “you” includes an individual, the estate of an individual, a corporation, an authority, an association, consortium or joint venture (whether incorporated or unincorporated), a partnership, a trust and any other entity;</p>
              <p className="pl-4">(e)	(party) a reference to a party includes that party’s executors, administrators, successors and permitted assigns, including persons taking by way of novation and, in the case of a trustee, includes any substituted or additional trustee;</p>
              <p className="pl-4">(f)	(this agreement) a reference to a party, clause, paragraph, schedule, exhibit, attachment or annexure is a reference to a party, clause, paragraph, schedule, exhibit, attachment or annexure to or of this agreement, and a reference to this agreement includes all schedules, exhibits, attachments and annexures to it;</p>
              <p className="pl-4">(g)	(document) a reference to a document (including this agreement) is to that document as varied, novated, ratified or replaced from time to time;</p>
              <p className="pl-4">(h)	(headings) headings and words in bold type are for convenience only and do not affect interpretation;</p>
              <p className="pl-4">(i)	(includes) the word “includes” and similar words in any form is not a word of limitation;</p>
              <p className="pl-4">(j)	(adverse interpretation) no provision of this agreement will be interpreted adversely to a party because that party was responsible for the preparation of this agreement or that provision; and</p>
              <p className="pl-4">(k)	(currency) a reference to $, or “dollar”, is to Australian currency, unless otherwise agreed in writing.</p>
            </div>
          </div>


        </div>
      </section>
    </div>

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