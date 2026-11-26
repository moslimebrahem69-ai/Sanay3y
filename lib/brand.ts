export const BRAND = { name: "صنايعي", latin: "Sanay3y", tagline: "شخّص العطل قبل ما تدفع" };
export const WA_NUMBER = "201017098353";
export const WA_DISPLAY = "01017098353";
export const waLink = (msg = "") => `https://wa.me/${WA_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
export const LINKS = {
  linkedin: "https://www.linkedin.com/in/moslim-ebrahim-0ba71b2b9/",
  facebook: "https://www.facebook.com/share/1F51FLGJFY/",
  github: "https://github.com/moslimebrahem69-ai/-",
};
export const CATEGORIES = [
  "تكييفات", "ثلاجات", "غسالات ملابس", "غسالات أطباق", "شاشات وتلفزيونات",
  "كمبيوتر ولابتوب", "لوحات كهربائية", "ماكينات صناعية", "تبريد السيارات", "أجهزة أخرى",
] as const;
export const WARRANTY = ["داخل الضمان", "خارج الضمان", "مش عارف"] as const;
