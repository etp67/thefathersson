/*
 * ============================================================
 *  SITE CONTENT — edit this file to update the website.
 *  No coding needed: change the text between the quotes,
 *  save, commit, and the site updates.
 * ============================================================
 */
window.SITE = {
  phone: "769.208.0337",
  phoneLink: "+17692080337",
  email: "thefatherssonhandy@gmail.com",

  /*
   * LINKS — paste the real URLs here once you have them.
   * Leave a link as "" and the button that uses it is hidden
   * (or falls back to calling / emailing).
   *
   * googleProfile: your Google Business Profile / Maps listing.
   *   Find it by searching your business on Google Maps -> Share -> Copy link.
   * googleReview: the "Ask for reviews" link from your Google Business
   *   Profile dashboard (looks like https://g.page/r/XXXX/review).
   * bookingCalendar: the Google Calendar "Appointment schedule" booking page
   *   link (see README). When set, it is shown right on the site in the
   *   "Book" section and customers can pick an open time on Zach's calendar.
   * booking: OR a link to any other scheduler (Square, Calendly…). Used only
   *   if bookingCalendar is blank. If both are blank, "Book" buttons call.
   */
  links: {
    googleProfile: "https://share.google/y7kUdznFhOlFfYcak",
    googleReview: "https://g.page/r/CXl_xawIMauSEBM/review",
    facebook: "https://www.facebook.com/thefatherssonhandy",
    facebookReviews: "https://www.facebook.com/thefatherssonhandy/reviews",
    bookingCalendar: "",
    booking: ""
  },

  /*
   * REVIEWS — copy real reviews from Google or Facebook here.
   * source: "google" or "facebook"
   * rating: 1–5 (Facebook "recommends" can just use 5)
   * url: (optional) link to the original review
   *
   * Example:
   * { name: "Jane D.", source: "google", rating: 5, date: "Oct 2026",
   *   text: "Zach pressure washed our driveway and it looks brand new." },
   */
  reviews: [
    { name: "Kelsey Page", source: "facebook", rating: 5, date: "Oct 2026",
      url: "https://www.facebook.com/share/p/19tWtDvPWv/",
      text: "Zach did an amazing job power washing the front of our house. We have an 80 year old home and he took such good care of it. Zach also washed my car and my wheels have not shined like that in Lord knows how long. I highly recommend The Father's Son Handy Works for any and all things!!" }
  ],

  /*
   * GALLERY — put photos in the  assets/gallery/  folder, then list them here.
   * For a before/after pair, add  before: "assets/gallery/xxx-before.jpg".
   * category: "pressure", "landscaping", or "repairs"
   *
   * Example:
   * { src: "assets/gallery/driveway-after.jpg",
   *   before: "assets/gallery/driveway-before.jpg",
   *   caption: "Driveway wash — Brandon", category: "pressure" },
   */
  gallery: [
    { src: "assets/gallery/patio-aggregate.jpg",
      caption: "Exposed-aggregate patio", category: "pressure" },
    { src: "assets/gallery/commercial-entry-steps.jpg",
      caption: "Commercial entrance & steps", category: "pressure" },
    { src: "assets/gallery/dumpster-pad.jpg",
      caption: "Commercial dumpster pad", category: "pressure" },
    { src: "assets/gallery/dumpster-pad-detail.jpg",
      caption: "Dumpster pad — up close", category: "pressure" }
  ]
};
