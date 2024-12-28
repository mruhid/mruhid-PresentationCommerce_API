import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const prisma = new PrismaClient();

app.get('/company', async (req, res) => {
  try {
    // Fetch company details
    const companyDetails = await prisma.companyDetails.findFirst({
      select: {
        companyLogo: true,
        companyName: true,
        companyWebLogo: true,
        fullName: true,
      },
    });

    // Handle case when no data is found
    if (!companyDetails) {
      return res.status(404).json({ error: "Company details not found." });
    }

    res.status(200).json(companyDetails);
  } catch (error) {
    console.error("Error fetching company details:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("Error disconnecting Prisma:", disconnectError);
    }
  }
});

// Define the /home route
app.post("/home", async (req, res) => {
  try {
    // Execute queries in parallel using Promise.all for better performance
    const [
      
      heroSection,
      heroSectionMedia,
      operationSection,
      operations,
      whyUsSection,
      features,
      socialSection,
      socialSectionMedia,
      goFormSection,
    ] = await Promise.all([
     
      prisma.heroSection.findFirst(),
      prisma.heroSectionMedia.findMany({
        include: { socialMedia: true },
      }),
      prisma.operationSection.findFirst({
        select: {
          title: true,
          description: true,
          action: true,
        },
      }),
      prisma.operations.findMany({
        select: {
          title: true,
          description: true,
          iconClass: true,
          link: true,
          place: true,
        },
        orderBy: { place: "asc" },
      }),
      prisma.whyUsSection.findFirst({
        select: {
          title: true,
          action: true,
        },
      }),
      prisma.whyUsFeatures.findMany(),
      prisma.socialSection.findFirst({
        select: {
          title: true,
          action: true,
        },
      }),
      prisma.socialSectionMedia.findMany({
        include: { socialMedia: true },
      }),
      prisma.goFormSection.findFirst({
        select: {
          title: true,
          action: true,
          buttonText: true,
          buttonSrc: true,
          iconClass: true,
        },
      }),
    ]);

    // Process hero section data
    const actions = heroSectionMedia.map((media) => ({
      label: media.socialMedia?.platform || "Unknown",
      iconClass: media.socialMedia?.iconClass || "",
      value: media.text || "",
      link: media.socialMedia?.link || "",
    }));
    const heroData = { ...heroSection, contactInfo: actions };

    // Process operations section data
    const operationsData = { ...operationSection, operations };

    // Process social section data
    const links = socialSectionMedia.map((media) => ({
      platform: media.socialMedia?.platform || "Unknown",
      iconClass: media.socialMedia?.iconClass || "",
      link: media.socialMedia?.link || "",
      place: media.socialMedia?.id || 0,
    }));
    const socialData = { ...socialSection, links };

    // Construct the final response
    const response = {
      heroSection: heroData,
      operationsSection: operationsData,
      whyUsSection: { ...whyUsSection, features },
      socialSection: socialData,
      goFormSection,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching home data:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Ensure Prisma client disconnects properly
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("Error disconnecting Prisma:", disconnectError);
    }
  }
});

// Define /about route
app.post("/about", async (req, res) => {
  try {
    // Fetch all data in parallel for better performance
    const [about, purposeData, otherWorksData] = await Promise.all([
      prisma.aboutPageSection.findFirst({
        select: {
          title: true,
          action: true,
          imgSrc: true,
          description: true,
        },
      }),
      prisma.purposeSection.findFirst({
        select: {
          title: true,
          action: true,
          description: true,
          catalog: true,
        },
      }),
      prisma.otherWorkSection.findFirst({
        select: {
          backgroundImg: true,
          action: true,
          overlay: true,
        },
      }),
    ]);

    // Construct a unified response
    const response = {
      aboutUsSection: about || {},
      purposeSection: purposeData || {},
      otherWorkSection: otherWorksData || {},
    };

    // Return the response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching /about data:", error);
    res.status(500).json({ error: "Failed to load /about data." });
  } finally {
    // Ensure Prisma disconnects
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("Error disconnecting Prisma:", disconnectError);
    }
  }
});

app.post("/price", async (req, res) => {
  try {
    // Fetch data in parallel
    const [documentSelection, priceOption] = await Promise.all([
      prisma.documentSelection.findFirst({
        select: {
          title: true,
          description: true,
        },
      }),
      prisma.priceOption.findMany({
        select: {
          buttonSrc: true,
          iconClass: true,
          title: true,
          action: true,
        },
      }),
      
    ]);

    // Transform priceOption to rename buttonSrc to href
    const transformedOptions = priceOption.map(option => ({
      href: option.buttonSrc, // Renaming buttonSrc to href
      iconClass: option.iconClass,
      title: option.title,
      action: true,
    }));

    // Construct the response object
    const response = {
      documentSelection: {...documentSelection,action:true} || {},
      options: transformedOptions || [],
    };

    // Send response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching /price data:", error);
    res.status(500).json({ error: "Failed to load /price data." });
  } finally {
    // Disconnect Prisma after sending the response
    prisma.$disconnect().catch(disconnectError => {
      console.error("Error disconnecting Prisma:", disconnectError);
    });
  }
});


app.post('/contact', async (req, res) => {
  try {
    const [contactPage, socialLinks, goForm] = await Promise.all([
      prisma.contactPage.findFirst({
        select: {
          header: true,
          description: true,
          action: true,
        },
      }),
      prisma.contactPageSocialMedia.findMany({
        include: { socialMedia: true },
      
      }),
      prisma.goFormSection.findFirst({
        select: {
          title: true,
          action: true,
          buttonText: true,
          buttonSrc: true,
          iconClass: true,
        },
      })
    ]);

    console.log( socialLinks);

    // If no social links exist, return empty array
    const modifiedLinks = socialLinks.length
      ? socialLinks.map(media => ({
          platform: media.socialMedia.platform,
          iconClass: media.socialMedia.iconClass,
          url: media.socialMedia.link,
        }))
      : [];

    // Preparing the final response
    const response = {
      contactPage: {
        ...contactPage,
        socialLinks: modifiedLinks,
      },
      goForm,
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Error fetching /contact data:", error);
    res.status(500).json({ error: "Failed to load /contact data." });
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("Error disconnecting Prisma:", disconnectError);
    }
  }
});


// Profile

app.post("/profile", async (req, res) => {
  try {
    const profile=await prisma.profile.findMany({
      select: {
        presentation: true,
      }
    })
    const temp=profile.map(a=>(a.presentation))

    const responce={
      profile:{
        presentations:temp
      }
    }

    return res.status(200).json(responce);
    
  } catch (error) {
    console.error("Error fetching /profile data:", error);
    return res.status(500).json({ error: "Failed to load /profile data." });
    
  }
})
// Forms Data
app.post("/books", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // Validate input (optional but recommended)
    if (!data.type || !data.data || !data.price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Add data to the database
    const addedData = await prisma.books.create({
      data: {
        type: data.type,
        data: data.data,
        price: data.price,
      },
    });

    res.status(201).json(addedData);
  } catch (error) {
    console.error("Error adding book data:", error);
    res.status(500).json({ error: "An error occurred while saving data" });
  }
});

app.post("/forms/:type", async (req, res) => {
  try {
    const type = req.params.type;

    // Fetch `books` and `formsDefault` data concurrently
    const [bookData, formsDefault] = await Promise.all([
      prisma.forms.findFirst({
        where: { type },
        select: {
          title: true,
          data: true,
          price: true,
        },
      }),
      prisma.formsDefault.findFirst({
        select: {
          modelText: true,
          wpNumber: true,
        },
      }),
    ]);

    // Check if `bookData` exists
    if (!bookData) {
      return res.status(404).json({ error: "Type not found" });
    }

    // Build the response object
    const response = {
      title: bookData.title,
      fields: bookData.data.array,
      modalText: formsDefault?.modelText || "Default modal text", // Fallback text
      wpNumber: formsDefault?.wpNumber || "https://wa.me/default",
      price: bookData.price,
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Error fetching form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
;


// footer
app.get("/footer", async (req, res) => {
  try {
    const footer = await prisma.footerSide.findFirst({
      select: {
        heading: true,
        logoImg: true,
        copyright: true,
        searchTools: true,
      },
    });

    const footerSocialMedia = await prisma.footerSocialMedia.findMany({
      include: {
        socialMedia: true,
      },
    });
    const socialLinks = footerSocialMedia.map((media) => {
      return {
        platform: media.socialMedia.platform,
        iconClass: media.socialMedia.iconClass,
        link: media.socialMedia.link,
      };
    });
    const footerData = {
      ...footer,
      socialLinks,
    };
    res.json(footerData);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
});
// Start the server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

