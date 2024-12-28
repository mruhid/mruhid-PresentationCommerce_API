import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Functions

async function addWhyUsFeatures() {
  try {
    const newData = await prisma.whyUsFeatures.createMany({
      data: [
        {
          title: "superrr",
          description: "men superem",
          image:
            "https://yusif.az/main/wp-content/uploads/2019/01/%D0%91%D0%B5%D0%B7-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-2.png",
        },
        {
          title: "Keyfiyyetli dizayn",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          image:
            "https://yusif.az/main/wp-content/uploads/2019/01/%D0%91%D0%B5%D0%B7-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-2.png",
        },
        {
          title: " dizayn",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          image:
            "https://yusif.az/main/wp-content/uploads/2019/01/%D0%91%D0%B5%D0%B7-%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-2.png",
        },
      ],
      skipDuplicates: true,
    });

    console.log(" Social Links added successfully.");
  } catch (error) {
    console.error("Error adding Social Links:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addWhyUs() {
  try {
    const newData = await prisma.whyUsSection.create({
      data: {
        title: "Bizim təqdimatlarımız sizə nə vədd edir?",
        action: true,
      },
      // skipDuplicates: true
    });

    console.log(" Social Links added successfully.");
  } catch (error) {
    console.error("Error adding Social Links:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addOperations() {
  try {
    const newData = await prisma.operations.createMany({
      data: [
        {
          title: "Haqqımızda",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt neque mollitia fuga blanditiis? Voluptas, quasi modi!",
          iconClass: "fas fa-book",
          link: "./about.html",
          place: 2,
          action: true,
        },
        {
          title: "Işlərimiz",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt neque mollitia fuga blanditiis? Voluptas, quasi modi!",
          iconClass: "fas fa-project-diagram",
          link: "./profile.html",
          place: 1,
          action: true,
        },
        {
          title: "Sifariş ver",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt neque mollitia fuga blanditiis? Voluptas, quasi modi!",
          iconClass: "fas fa-money-bill-wave",
          link: "./price.html",
          place: 3,
          action: true,
        },
        {
          title: "Əlaqə Vasitələri",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt neque mollitia fuga blanditiis? Voluptas, quasi modi!",
          iconClass: "fas fa-envelope",
          link: "./contact.html",
          place: 4,
          action: true,
        },
      ],
      skipDuplicates: true,
    });

    console.log(" Social Links added successfully.");
  } catch (error) {
    console.error("Error adding Social Links:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addOperationSection() {
  try {
    const newData = await prisma.operationSection.create({
      data: {
        title: "Əmliyyatlar",
        description: "description",
        action: true,
      },
    });

    console.log(" Social Links added successfully.");
  } catch (error) {
    console.error("Error adding Social Links:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addContactPageSocialMedia() {
  try {
    const platforms = ["Email", "Instagram", "Facebook", "LinkedIn", "Twitter"];

    // Use Promise.all to wait for all async operations
    const data = await Promise.all(
      platforms.map(async (platform) => {
        // Find the ID of the platform in socialLinks
        const id = await prisma.socialLinks.findFirst({
          where: { platform },
          select: {
            id: true,
          },
        });

        // Handle cases where the platform does not exist in socialLinks
        if (!id) {
          console.warn(`Platform not found: ${platform}`);
          return null;
        }

        // Add the data to the contact_page_social_media table
        const addedData = await prisma.contactPageSocialMedia.create({
          data: {
            socialMediaId: id.id,
          },
        });

        return addedData; // Return the result for logging or further use
      })
    );

    // Log successfully added data
    console.log("Added Data:", data.filter(Boolean)); // Filter out null entries
  } catch (error) {
    console.error("Something went wrong", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addHeroSectionMedia() {
  try {
    // Fetch the WhatsApp and Telegram social media information
    const whatsapp = await prisma.socialLinks.findFirst({
      where: { platform: "WhatsApp" },
    });

    const telegram = await prisma.socialLinks.findFirst({
      where: { platform: "Telegram" },
    });

    if (!whatsapp || !telegram) {
      throw new Error(
        "WhatsApp or Telegram social links not found in the database."
      );
    }

    // Insert data into HeroSectionMedia with related SocialLinks information
    const newHeroSectionMedia = await prisma.heroSectionMedia.createMany({
      data: [
        {
          text: "sifaris ver", // Button text
          socialMediaId: whatsapp.id, // Link to WhatsApp
        },
        {
          text: "sifaris ver", // Button text
          socialMediaId: telegram.id, // Link to Telegram
        },
      ],
    });

    // Now, fetch the full HeroSectionMedia with related social media details
    const heroSectionMediaWithDetails = await prisma.heroSectionMedia.findMany({
      include: {
        socialMedia: true, // Include the related SocialLinks information
      },
    });

    // Log the full HeroSectionMedia entries with social media details
    console.log("HeroSectionMedia with details:", heroSectionMediaWithDetails);
  } catch (error) {
    console.error("Error adding Hero Section Media:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addHeroSection() {
  try {
    const newHeroSection = await prisma.heroSection.create({
      data: {
        subtitle: "Teqdimat Sayti",
        backgroundImg: "../img/heroBg.jpg",
        title: "Biz supper<br>ve munasib tedimat hazirlayiriq",
        description:
          "Dream great dreams, make them a reality with us. Suspendisse varius odio sit amet mattis.",
        buttonText: "Learn More", // Example: You can adjust this field as required.
        buttonSrc: "/prise.html", // Example: Adjust the URL accordingly.
        action: true, // Adjust this based on your requirements.
      },
    });

    console.log("Hero Section added successfully:", newHeroSection);
  } catch (error) {
    console.error("Error adding Hero Section:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addSocialLinks() {
  try {
    const newSocialLinks = await prisma.socialLinks.createMany({
      data: [
        {
          platform: "Facebook",
          iconClass: "fab fa-facebook",
          link: "https://facebook.com",
        },
        {
          platform: "Twitter",
          iconClass: "fab fa-twitter",
          link: "https://twitter.com",
        },
        {
          platform: "Instagram",
          iconClass: "fab fa-instagram",
          link: "https://instagram.com",
        },
        {
          platform: "LinkedIn",
          iconClass: "fab fa-linkedin",
          link: "https://linkedin.com",
        },
        {
          platform: "YouTube",
          iconClass: "fab fa-youtube",
          link: "https://youtube.com",
        },
        {
          platform: "TikTok",
          iconClass: "fab fa-tiktok",
          link: "https://tiktok.com",
        },
        {
          platform: "WhatsApp",
          iconClass: "fab fa-whatsapp",
          link: "https://whatsapp.com",
        },
        {
          platform: "Telegram",
          iconClass: "fab fa-telegram",
          link: "https://telegram.org",
        },
        {
          platform: "Discord",
          iconClass: "fab fa-discord",
          link: "https://discord.com",
        },
        { platform: "Phone", iconClass: "fab fa-phone", link: "tel:123456789" },
        {
          platform: "Email",
          iconClass: "fab fa-email",
          link: "mailto:your-email@example.com?subject=Hello",
        },
      ],

      skipDuplicates: true, // Optional: Avoid duplicate entries
    });

    console.log(`${newSocialLinks.count} Social Links added successfully.`);
  } catch (error) {
    console.error("Error adding Social Links:", error.message); // More specific error message
  } finally {
    await prisma.$disconnect();
  }
}

async function addCompanyData() {
  try {
    const newSocialLinks = await prisma.companyDetails.create({
      data: {
        companyLogo: "https://cdn-icons-png.flaticon.com/512/731/731972.png",
        companyName: "VusalCompany",
        companyWebLogo: "https://cdn-icons-png.flaticon.com/512/731/731972.png",
      },
    });

    console.log(` Social Links added successfully.`);
  } catch (error) {
    console.error("Error adding Social Links:", error.message); // More specific error message
  } finally {
    await prisma.$disconnect();
  }
}

async function addSocialSection() {
  try {
    const newSocialLinks = await prisma.socialSection.create({
      data: {
        title: "Follow us",
        action: true,
      },
    });

    console.log(` Social Links added successfully.`);
  } catch (error) {
    console.error("Error adding Social Links:", error.message); // More specific error message
  } finally {
    await prisma.$disconnect();
  }
}

async function addSocialSectionMedias() {
  try {
    // Step 1: Get the social media platforms
    const medias = await prisma.socialLinks.findMany({
      where: {
        platform: {
          in: ["Instagram", "Facebook", "LinkedIn", "Twitter"], // Adjust platform names as needed
        },
      },
    });

    // Step 2: Map the social media data to the format needed for SocialSectionMedia
    const sectionMediaData = medias.map((media) => ({
      socialMediaId: media.id, // Use the social media ID
    }));

    // Step 3: Add SocialSectionMedia entries using createMany
    const newSocialSectionMedias = await prisma.socialSectionMedia.createMany({
      data: sectionMediaData,
    });

    console.log(
      `${newSocialSectionMedias.count} Social Section Medias added successfully.`
    );
  } catch (error) {
    console.error("Error adding Social Section Media:", error.message); // More specific error message
  } finally {
    await prisma.$disconnect();
  }
}

async function goFormSection() {
  try {
    const newData = await prisma.goFormSection.create({
      data: {
        title: "Şifaris üçün form səhifəsinə daxil olun",
        action: true,
        buttonText: "Sifaris ver",
        buttonSrc: "/prise.html",
        iconClass: "fas fa-arrow-right",
      },
    });
    console.log(` Data added successfully.`);
  } catch (error) {
    console.error("Error adding Social Links:", error.message); // More specific error message
  } finally {
    await prisma.$disconnect();
  }
}

async function addFooterSide() {
  try {
    const addFooter = await prisma.footerSide.create({
      data: {
        heading: "Vusal Company",
        logoImg: "https://cdn-icons-png.flaticon.com/512/731/731972.png",
        copyright: "&#169;Ruhid.Ml All Right Reserved:2024",
      },
    });

    console.log(` Social Section Media records deleted successfully.`);
  } catch (error) {
    console.error("Error deleting Social Section Media:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function addFooterSocialMedia() {
  try {
    // Fetch the social media entries you want to link in the footer
    const medias = await prisma.socialLinks.findMany({
      where: {
        platform: {
          in: ["Instagram", "Facebook", "LinkedIn", "whatsapp"], // Adjust platform names as needed
        },
      },
    });

    // Map the data to the required format for footer social media
    const newData = medias.map((media) => ({
      socialMediaId: media.id,
    }));

    // Add new entries to the FooterSocialMedia table
    const addedFooterSocialMedia = await prisma.footerSocialMedia.createMany({
      data: newData,
    });

    console.log(
      `${addedFooterSocialMedia.count} Social Media records added to Footer successfully.`
    );
  } catch (error) {
    console.error("Error adding Social Media to Footer:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function uploadAboutUsSection() {
  const aboutUsSection = {
    title: "Biz Kimik?",
    action: true,
    imgSrc:
      "https://image.cnbcfm.com/api/v1/image/107432836-1719321841803-gettyimages-2154535982-porzycki-nicedail240528_npKmt.jpeg?v=1727973516",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, minima architecto sapiente harum quos distinctio quasi repellat aliquid illo sint, modi reiciendis repellendus, error veritatis atque consequatur? Minus, dolor praesentium.",
  };

  try {
    // Insert the new section into the table
    const result = await prisma.aboutPageSection.create({
      data: aboutUsSection,
    });
    console.log("About Us Section uploaded successfully:", result);
  } catch (error) {
    console.error("Error uploading About Us Section:", error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

async function uploadPurposeSection() {
  const purposeSection = {
    title: "Meqsedimiz",
    action: true,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni, minima architecto sapiente harum quos distinctio quasi repellat aliquid illo sint, modi reiciendis repellendus, error veritatis atque consequatur? Minus, dolor praesentium.",
    catalog: {
      highlight: "Meqsedimiz",
      description: "Biz seliqei ve bomba teqdimat hazirlamaqdir",
      imgSrc:
        "https://image.cnbcfm.com/api/v1/image/107432836-1719321841803-gettyimages-2154535982-porzycki-nicedail240528_npKmt.jpeg?v=1727973516",
    },
  };

  try {
    // Insert the new section into the table
    const result = await prisma.purposeSection.create({
      data: purposeSection,
    });
    console.log("Purpose Section uploaded successfully:", result);
  } catch (error) {
    console.error("Error uploading Purpose Section:", error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

async function uploadOtherWorkSection() {
  const otherWorkSection = {
    backgroundImg: "./img/default/defaultOtherWorksImg.webp",
    action: true,
    overlay: {
      title: "Keyfiyyetli teqdimat isteyirsiniz??",
      description: "Artiq uzun muddetdirki bu isle mesgul oluruq!",
      buttonText: "Teqdimatlarimiza nezer yetir",
      buttonSrc: "./profile.html",
    },
  };

  try {
    // Insert the new section into the table
    const result = await prisma.otherWorkSection.create({
      data: otherWorkSection,
    });
    console.log("Other Work Section uploaded successfully:", result);
  } catch (error) {
    console.error("Error uploading Other Work Section:", error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

async function updateFullName() {
  const id = 1;
  const fullName = "Eren Yaefar";
  try {
    // Validate input
    if (!id || !fullName) {
      throw new Error("Both 'id' and 'fullName' must be provided.");
    }

    // Update the fullName field for the specified ID
    const updatedCompany = await prisma.companyDetails.update({
      where: { id },
      data: { fullName },
    });

    console.log(
      `FullName updated successfully for ID ${id}:`,
      updatedCompany.fullName
    );
  } catch (error) {
    if (error.code === "P2025") {
      // Prisma-specific error code for "Record not found"
      console.error(`No company found with ID ${id}.`);
    } else {
      console.error("Error updating fullName column:", error.message || error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

async function addDocumentSelection() {
  const documentSelection = {
    title: "Sifariş Kategoryaları",
    description: "Sifariş etmək istədiyin kategoriyanı seçin!",
  };

  try {
    const result = await prisma.documentSelection.create({
      data: documentSelection,
    });
    console.log("Data added successfully:", result);
  } catch (error) {
    console.error("Error adding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addPriceOptions() {
  const options = [
    {
      buttonSrc: "./book/cv.html",
      iconClass: "fas fa-id-card",
      title: "CV",
      action: true,
    },
    {
      buttonSrc: "./book/diploma.html",
      iconClass: "fas fa-graduation-cap",
      title: "Diplom İşi",
      action: true,
    },
    {
      buttonSrc: "./book/slide.html",
      iconClass: "fas fa-chart-line",
      title: "Təqdimat(pptx)",
      action: true,
    },
    {
      buttonSrc: "./book/coverLetter.html",
      iconClass: "fas fa-envelope",
      title: "Cover Letter",
      action: true,
    },
    {
      buttonSrc: "./book/courseWork.html",
      iconClass: "fas fa-book",
      title: "Kurs İşi",
      action: true,
    },
    {
      buttonSrc: "./book/word.html",
      iconClass: "fas fa-file-word",
      title: "Word Sərbəst iş(docx)",
      action: true,
    },
  ];

  try {
    const results = await prisma.priceOption.createMany({
      data: options,
    });
    console.log(`${results.count} options added successfully.`);
  } catch (error) {
    console.error("Error adding options:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addContactPageData() {
  const contactPageData = {
    header: "Bizimlə Əlaqə",
    description: "Sosial sebeke hesablarimizdan bizleri izleye bilersiniz",
    action: true,
  };

  try {
    const result = await prisma.contactPage.create({
      data: contactPageData,
    });
    console.log("Contact page data added successfully:", result);
  } catch (error) {
    console.error("Error adding contact page data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function addProfileData() {
  const presentations = [
    {
      imageSrc: "/presentation/img/Visit kart.png",
      altText: "Visit Cart",
      link: "/presentation/components/Mektub.pdf",
    },
    {
      imageSrc: "https://media.timeout.com/images/106181719/750/562/image.jpg",
      altText: "Akademik yazi",
      link: "/presentation/components/Ruhid_akademik_yazı(558).pptx",
    },
  ];

  try {
    for (const presentation of presentations) {
      const newRow = await prisma.profile.create({
        data: {
          presentation: { ...presentation },
        },
      });
      console.log("Rows added:", newRow);
    }
  } catch (error) {
    console.error("Error adding rows:", error);
  } finally {
    await prisma.$disconnect();
  }
}

//Forms data

async function addFormsData() {
  try {
    const formsData=[
      {
          type:"courceWork",
          data:{
              array:[
                  {
                      "type": "text",
                      "id": "fullName",
                      "label": "Tam Ad",
                      "placeholder": "Ad və soyadınızı daxil edin",
                      "options": null
                  },
                  {
                      "type": "tel",
                      "id": "phoneNumber",
                      "label": "Telefon Nömrəsi",
                      "placeholder": "Telefon nömrənizi daxil edin",
                      "options": null
                  },
                  {
                      "type": "select",
                      "id": "language",
                      "label": "Dil",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Dil Seçimi --"
                          },
                          {
                              "value": "az",
                              "text": "Azərbaycan"
                          },
                          {
                              "value": "ing",
                              "text": "İngilis"
                          },
                          {
                              "value": "rus",
                              "text": "Rus"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "timeFactor",
                      "label": "Xidmət Müddəti",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Vaxtı Seçin --"
                          },
                          {
                              "value": "standart",
                              "text": "Standart (2 həftə və ya daha çox)"
                          },
                          {
                              "value": "tecili",
                              "text": "Təcili (bir neçə gün)"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "pageCount",
                      "label": "Səhifə Sayı",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Səhifə Sayını Seçin --"
                          },
                          {
                              "value": "qisa",
                              "text": "10-20 Səhifə"
                          },
                          {
                              "value": "uzun",
                              "text": "20-100 Səhifə"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "researchLevel",
                      "label": "Tədqiqat Səviyyəsi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Səviyyəni Seçin --"
                          },
                          {
                              "value": "esas",
                              "text": "Əsas Mənbələr"
                          },
                          {
                              "value": "derin",
                              "text": "Dərin Elmi Tədqiqat"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "presentation",
                      "label": "Təqdimatın Daxil Edilməsi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Təqdimatı Seçin --"
                          },
                          {
                              "value": "yox",
                              "text": "Yalnız Mətn"
                          },
                          {
                              "value": "var",
                              "text": "PowerPoint Təqdimat ilə"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "text",
                      "id": "others",
                      "label": "Digər İstəklər",
                      "placeholder": "Əlavə etmək istədiyiniz məqamları yaza bilərsiniz",
                      "options": null
                  }
              ]
          },
          title:"Kurs İşi Üçün Qiymət Hesablama",
          price:{
              "pageCount": {
                  "qisa": 15,
                  "uzun": 30
              },
              "researchLevel": {
                  "esas": 10,
                  "derin": 25
              },
              "presentation": {
                  "yox": 0,
                  "var": 10
              },
              "timeFactor": {
                  "standart": 4,
                  "tecili": 20
              },
              "language": {
                  "az": 5,
                  "ing": 10,
                  "rus": 8
              }
          }
      },
      {
          type:"coverLetter",
          data:{
              array:[
                  {
                      "type": "text",
                      "id": "fullName",
                      "label": "Tam Ad",
                      "placeholder": "Ad və soyadınızı daxil edin",
                      "options": null
                  },
                  {
                      "type": "tel",
                      "id": "phoneNumber",
                      "label": "Telefon Nömrəsi",
                      "placeholder": "Telefon nömrənizi daxil edin",
                      "options": null
                  },
                  {
                      "type": "text",
                      "id": "letterSubject",
                      "label": "Məktub Mövzusu",
                      "placeholder": "Məktub mövzusunu daxil edin",
                      "options": null
                  },
                  {
                      "type": "text",
                      "id": "others",
                      "label": "Digər İstəklər",
                      "placeholder": "Əlavə etmək istədiyiniz məqamları yaza bilərsiniz",
                      "options": null
                  },
                  {
                      "type": "select",
                      "id": "language",
                      "label": "Dil",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Dil Seçimi --"
                          },
                          {
                              "value": "azerbaycan",
                              "text": "Azərbaycan"
                          },
                          {
                              "value": "ingilis",
                              "text": "İngilis"
                          },
                          {
                              "value": "rus",
                              "text": "Rus"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "deliveryTime",
                      "label": "Xidmət Müddəti",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Müddət Seçin --"
                          },
                          {
                              "value": "standart",
                              "text": "Standart (2-3 Gün)"
                          },
                          {
                              "value": "tecili",
                              "text": "Təcili (24 Saat və ya az)"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "letterPurpose",
                      "label": "Məktubun Məqsədi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Məqsədi Seçin --"
                          },
                          {
                              "value": "is",
                              "text": "İş Müraciəti"
                          },
                          {
                              "value": "teqaud",
                              "text": "Təqaüd Proqramı"
                          },
                          {
                              "value": "akademik",
                              "text": "Akademik Qəbul"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "customizationLevel",
                      "label": "Fərdiləşdirmə Səviyyəsi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Fərdiləşdirmə Seçimi --"
                          },
                          {
                              "value": "umumi",
                              "text": "Ümumi Forma"
                          },
                          {
                              "value": "ferdi",
                              "text": "Fərdi Təcrübə Üzrə"
                          }
                      ],
                      "placeholder": null
                  }
              ]
          },
          title:"Cover Letter Üçün Qiymət Hesablama",
          price:{
              "mektubMaqsedi": {
                  "is": 10,
                  "teqaud": 15,
                  "akademik": 20
              },
              "ferdiSeviyye": {
                  "umumi": 5,
                  "ferdi": 10
              },
              "xidmetMuddeti": {
                  "tecili": 20,
                  "standart": 10
              },
              "dil": {
                  "azerbaycan": 1,
                  "ingilis": 4,
                  "rus": 4
              }
          }
      },
      {
          type:"cv",
          data:{
              array:[
                  {
                      "type": "text",
                      "id": "fullName",
                      "label": "Tam Ad",
                      "placeholder": "Ad və soyadınızı daxil edin",
                      "options": null
                  },
                  {
                      "type": "tel",
                      "id": "phoneNumber",
                      "label": "Telefon Nömrəsi",
                      "placeholder": "Telefon nömrənizi daxil edin",
                      "options": null
                  },
                  {
                      "type": "text",
                      "id": "others",
                      "label": "Digər İstəklər",
                      "placeholder": "Əlavə etmək istədiyiniz məqamları yaza bilərsiniz",
                      "options": null
                  },
                  {
                      "type": "select",
                      "id": "language",
                      "label": "Dil",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Dil Seçimi --"
                          },
                          {
                              "value": "azerbaijani",
                              "text": "Azərbaycan"
                          },
                          {
                              "value": "english",
                              "text": "İngilis"
                          },
                          {
                              "value": "russian",
                              "text": "Rus"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "duration",
                      "label": "Müddət",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Müddət Seçin --"
                          },
                          {
                              "value": "urgent",
                              "text": "Təcili Xidmət"
                          },
                          {
                              "value": "standard",
                              "text": "Standart Xidmət"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "cvType",
                      "label": "CV-in Tipi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- CV Tipini Seçin --"
                          },
                          {
                              "value": "standard",
                              "text": "Standart CV"
                          },
                          {
                              "value": "professional",
                              "text": "Peşəkar dizaynlı CV"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "experienceLevel",
                      "label": "Təcrübə Səviyyəsi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Təcrübə Səviyyəsini Seçin --"
                          },
                          {
                              "value": "graduate",
                              "text": "Yeni Məzun"
                          },
                          {
                              "value": "mid",
                              "text": "Orta Səviyyə"
                          },
                          {
                              "value": "manager",
                              "text": "İdarəçi / Rəhbər"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "serviceLevel",
                      "label": "Xidmət Səviyyəsi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Xidmət Səviyyəsini Seçin --"
                          },
                          {
                              "value": "simple",
                              "text": "Sadə Düzəlişlər"
                          },
                          {
                              "value": "full",
                              "text": "Tam Yeni CV Yazma"
                          }
                      ],
                      "placeholder": null
                  }
              ]
          },
          title:"CV     Üçün Qiymət Hesablama",
          price:{
              "cvType": {
                  "standard": 1,
                  "professional": 4
              },
              "serviceLevel": {
                  "simple": 2,
                  "full": 4
              },
              "experienceLevel": {
                  "graduate": 5,
                  "mid": 10,
                  "manager": 15
              },
              "duration": {
                  "urgent": 20,
                  "standard": 10
              },
              "language": {
                  "azerbaijani": 1,
                  "english": 4,
                  "russian": 4
              }
          },
      },
      {
          type:"diploma",
          data:{
              array:[
                  {
                      "type": "text",
                      "id": "studentName",
                      "label": "Tam Ad",
                      "placeholder": "Ad və soyadınızı daxil edin",
                      "options": null
                  },
                  {
                      "type": "tel",
                      "id": "contactNumber",
                      "label": "Əlaqə Nömrəsi",
                      "placeholder": "Telefon nömrənizi daxil edin",
                      "options": null
                  },
                  {
                      "type": "text",
                      "id": "topicName",
                      "label": "Mövzunun Adı",
                      "placeholder": "Mövzunun adını daxil edin",
                      "options": null
                  },
                  {
                      "type": "text",
                      "id": "uniName",
                      "label": "Universitet Adı",
                      "placeholder": "Universitet adını daxil edin",
                      "options": null
                  },
                  {
                      "type": "text",
                      "id": "others",
                      "label": "Digər İstəklər",
                      "placeholder": "Əlavə etmək istədiyiniz məqamları yaza bilərsiniz",
                      "options": null
                  },
                  {
                      "type": "select",
                      "id": "language",
                      "label": "Dil Seçin",
                      "options": [
                          {
                              "value": "az",
                              "text": "Azərbaycan"
                          },
                          {
                              "value": "en",
                              "text": "English"
                          },
                          {
                              "value": "ru",
                              "text": "Русский"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "timeframe",
                      "label": "Müddət",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Seçim edin --"
                          },
                          {
                              "value": "Standart",
                              "text": "Standart müddət"
                          },
                          {
                              "value": "Təcili",
                              "text": "Təcili xidmət"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "projectType",
                      "label": "Tədqiqatın Növü",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Seçim edin --"
                          },
                          {
                              "value": "Teorik",
                              "text": "Teorik diplom işi"
                          },
                          {
                              "value": "Praktiki",
                              "text": "Praktiki tədqiqat işi"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "scope",
                      "label": "İşin Həcmi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Seçim edin --"
                          },
                          {
                              "value": "Standart",
                              "text": "Standart diplom işi (40-50 səhifə)"
                          },
                          {
                              "value": "Genişləndirilmiş",
                              "text": "Genişləndirilmiş iş (60+ səhifə)"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "design",
                      "label": "Dizayn və Təqdimat",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Seçim edin --"
                          },
                          {
                              "value": "YalnızMətn",
                              "text": "Diplom işinin mətni"
                          },
                          {
                              "value": "Slaydlar",
                              "text": "Diplom işi + slaydlar"
                          }
                      ],
                      "placeholder": null
                  },
                  {
                      "type": "select",
                      "id": "research",
                      "label": "Araşdırma Tələb Səviyyəsi",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Seçim edin --"
                          },
                          {
                              "value": "Ümumi",
                              "text": "Ədəbiyyat icmalı və ümumi məlumat"
                          },
                          {
                              "value": "Dərin",
                              "text": "Statistik analiz və xüsusi metodologiya"
                          }
                      ],
                      "placeholder": null
                  }
              ]
          },
          title:"Diplom İşi Qiymət Hesablama",
          price:{
              "scope": {
                  "Standart": 3,
                  "Genişləndirilmiş": 6
              },
              "research": {
                  "Ümumi": 1,
                  "Dərin": 3
              },
              "projectType": {
                  "Teorik": 2,
                  "Praktiki": 4
              },
              "design": {
                  "YalnızMətn": 1,
                  "Slaydlar": 3
              },
              "timeframe": {
                  "Təcili": 5,
                  "Standart": 2
              },
              "language": {
                  "az": 1,
                  "en": 4,
                  "ru": 3
              }
          }
      },
      {
          type:"presentation",
          data:{
              array:[
                  {
                      "type": "text",
                      "id": "studentName",
                      "label": "Tam Ad",
                      "placeholder": "Ad və soyadınızı daxil edin"
                  },
                  {
                      "type": "tel",
                      "id": "contactNumber",
                      "label": "Əlaqə Nömrəsi",
                      "placeholder": "Telefon nömrənizi daxil edin"
                  },
                  {
                      "type": "text",
                      "id": "uniName",
                      "label": "Universitet Adı",
                      "placeholder": "Universitet adını daxil edin"
                  },
                  {
                      "type": "text",
                      "id": "topicName",
                      "label": "Mövzunun Adı",
                      "placeholder": "Mövzunun adını daxil edin"
                  },
                  {
                      "type": "number",
                      "id": "slides",
                      "label": "Slide sayı",
                      "placeholder": "Sayı daxil edin",
                      "min": 1
                  },
                  {
                      "type": "text",
                      "id": "others",
                      "label": "Digər İstəklər",
                      "placeholder": "Əlavə etmək istədiyiniz məqamları yaza bilərsiniz"
                  },
                  {
                      "type": "select",
                      "id": "language",
                      "label": "Dil",
                      "options": [
                          {
                              "value": "",
                              "text": "--  Dil seçimi --"
                          },
                          {
                              "value": "az",
                              "text": "Azərbaycan"
                          },
                          {
                              "value": "eng",
                              "text": "Ingilis"
                          },
                          {
                              "value": "rus",
                              "text": "Rus"
                          }
                      ]
                  },
                  {
                      "type": "select",
                      "id": "timeframe",
                      "label": "Müddət",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Seçim edin --"
                          },
                          {
                              "value": "Standart",
                              "text": "Standart müddət"
                          },
                          {
                              "value": "Təcili",
                              "text": "Təcili xidmət"
                          }
                      ]
                  },
                  {
                      "type": "select",
                      "id": "quality",
                      "label": "Keyfiyyət",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Keyfiyyət seçimi --"
                          },
                          {
                              "value": "Zəif",
                              "text": "Zəif"
                          },
                          {
                              "value": "Orta",
                              "text": "Orta"
                          },
                          {
                              "value": "Güclü",
                              "text": "Güclü"
                          }
                      ]
                  }
              ]
          },
          title:"Təqdimat qiyyməti hesablayıcı",
          price:{
              "quality": {
                  "Zəif": 1,
                  "Orta": 2,
                  "Güclü": 3
              },
              "timeframe": {
                  "Təcili": 5,
                  "Standart": 2
              },
              "language": {
                  "az": 1,
                  "eng": 3,
                  "rus": 2
              },
              "slides": 0.5
          }
      },
      {
          type:"word",
          data:{
              array:[
                  {
                      "type": "text",
                      "id": "studentName",
                      "label": "Tam Adınız",
                      "placeholder": "Ad və soyadınızı daxil edin"
                  },
                  {
                      "type": "tel",
                      "id": "contactNumber",
                      "label": "Əlaqə Nömrəsi",
                      "placeholder": "Telefon nömrənizi daxil edin"
                  },
                  {
                      "type": "text",
                      "id": "topicName",
                      "label": "Mövzunun Adı",
                      "placeholder": "Mövzunun adını daxil edin"
                  },
                  {
                      "type": "number",
                      "id": "slides",
                      "label": "Səhifə sayı",
                      "placeholder": "Sayı daxil edin",
                      "min": 1
                  },
                  {
                      "type": "text",
                      "id": "others",
                      "label": "Digər İstəklər",
                      "placeholder": "Əlavə etmək istədiyiniz məqamları yaza bilərsiniz"
                  },
                  {
                      "type": "select",
                      "id": "language",
                      "label": "Dil",
                      "options": [
                          {
                              "value": "",
                              "text": "--  Dil seçimi --"
                          },
                          {
                              "value": "az",
                              "text": "Azərbaycan"
                          },
                          {
                              "value": "eng",
                              "text": "Ingilis"
                          },
                          {
                              "value": "rus",
                              "text": "Rus"
                          }
                      ]
                  },
                  {
                      "type": "select",
                      "id": "deliveryTime",
                      "label": "Xidmət Müddəti",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Müddət Seçin --"
                          },
                          {
                              "value": "standart",
                              "text": "Standart (2-3 Gün)"
                          },
                          {
                              "value": "tecili",
                              "text": "Təcili (24 Saat və ya az)"
                          }
                      ]
                  },
                  {
                      "type": "select",
                      "id": "quality",
                      "label": "Mənbə Keyfiyyəti",
                      "options": [
                          {
                              "value": "",
                              "text": "-- Keyfiyyət seçimi --"
                          },
                          {
                              "value": "Zəif",
                              "text": "Zəif"
                          },
                          {
                              "value": "Orta",
                              "text": "Orta"
                          },
                          {
                              "value": "Güclü",
                              "text": "Güclü"
                          }
                      ]
                  }
              ]
          },
          title:"Sərbəst iş(word) qiyyməti hesablayıcı",
          price:{
              "xidmetMuddeti": {
                  "tecili": 20,
                  "standart": 10
              },
              "quality": {
                  "Zəif": 1,
                  "Orta": 2,
                  "Güclü": 3
              },
              "language": {
                  "az": 1,
                  "eng": 3,
                  "rus": 2
              },
              "pages": 0.5
          }
      },
  
  ]

  for (const formData of formsData) {
    await prisma.forms.create({
      data: formData,
    });
  }
  console.log('Forms data added successfully!' );
  } catch (error) {
    console.error('Error adding forms data:', error);
  } finally {
    await prisma.$disconnect();
  }
  
}
async function addFormsDefault() {
  try {
    const data = {
      modelText: "Sifarişiniz uğurla qəbul edildi!",
      wpNumber: "https://wa.me/+994516944256"
    };

    // Add the data directly without nesting it inside another object
    const addedData = await prisma.formsDefault.create({
      data: data
    });

    console.log("Data added successfully:", addedData);
  } catch (error) {
    console.error("Error adding forms data:", error);
  } finally {
    await prisma.$disconnect();
  }
}
function UploadData() {
  try {
    addCompanyData();
    updateFullName();
    addSocialLinks();
    addHeroSection();
    addHeroSectionMedia();
    addOperationSection();
    addOperations();
    addWhyUs();
    addWhyUsFeatures();
    goFormSection();
    addSocialSection();
    addSocialSectionMedias();
    addFooterSide();
    addFooterSocialMedia();
    // About Page Data
    uploadAboutUsSection();
    uploadPurposeSection();
    uploadOtherWorkSection();
    // Price page data
    addDocumentSelection();
    addPriceOptions();
    //contact page data
    addContactPageData();
    addContactPageSocialMedia();
    // Update profile
    addProfileData();
    // Add Forms
    addFormsData();
    addFormsDefault();

    console.log("Data uploaded successfully.");
  } catch (error) {
    console.error("Error uploading data:", error.message);
  }
}

// If You Change Database Url or using this file first time you need to run this file
// For this clear comentary from UploadData() on the bottom.After that open nodejs terminal and run "node autoUpload.js"

// UploadData();
