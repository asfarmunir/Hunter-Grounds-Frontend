import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-[#000214] relative p-4 md:p-12 space-y-4 md:space-y-3">
      <Image
        src={"/images/footerBg.svg"}
        alt="bg"
        width={500}
        height={500}
        className="  opacity-40 absolute right-0"
      />{" "}
      <h4 className="text-2xl 2xl:text-3xl">
        <span className="text-primary-50">HuntGrounds</span> Cookie Policy
      </h4>
      <p className="text-sm 2xl:text-base">Last Updated: June 2024</p>
      <p className="text-sm 2xl:text-base">
        At HuntGrounds.com ("we," "us," or "our"), we are committed to
        respecting your privacy and ensuring a transparent and secure user
        experience. This Cookie Policy explains how we use cookies and similar
        technologies when you visit our website to help you find hunting
        grounds. By using HuntGrounds.com, you agree to the use of cookies as
        described in this policy.
      </p>
      <p className="text-sm 2xl:text-base"> 1. What Are Cookies?</p>
      <p className="text-sm 2xl:text-base">
        Cookies are small text files placed on your device (computer,
        smartphone, or tablet) when you visit a website. They help websites
        recognize your device, remember your preferences, and provide a better
        user experience.
      </p>
      <p className="text-sm 2xl:text-base"> 2. How We Use Cookies</p>
      <p className="text-sm 2xl:text-base">
        We use cookies on HuntGrounds.com for the following purposes:
      </p>
      <p className="text-sm 2xl:text-base">
        - Essential Cookies: These cookies are necessary for the basic
        functionality of the website. They allow you to navigate the site,
        access secure areas, and use essential features, such as account logins
        or searching for hunting grounds.
      </p>
      <p className="text-sm 2xl:text-base">
        - Performance and Analytics Cookies: These cookies collect anonymous
        data on how visitors use our website. They help us understand which
        pages are most popular, how visitors move around the site, and where we
        can improve the user experience.
      </p>
      <p className="text-sm 2xl:text-base">
        - Functionality Cookies: These cookies remember your preferences (such
        as language or region) and help customize the website to provide you
        with a more personalized experience.
      </p>
      <p className="text-sm 2xl:text-base">
        - Advertising and Targeting Cookies: These cookies are used to show you
        relevant ads based on your interests. They also limit the number of
        times you see an ad and help measure the effectiveness of advertising
        campaigns.
      </p>
      <p className="text-sm 2xl:text-base"> 3. Third-Party Cookies</p>
      <p className="text-sm 2xl:text-base">
        We may work with third-party service providers (such as analytics or
        advertising platforms) who place cookies on your device to collect
        information about your interaction with our site. These third parties
        have their own privacy policies, and we recommend reviewing them to
        understand their use of cookies.
      </p>
      <p className="text-sm 2xl:text-base">4. Managing Cookies</p>
      <p className="text-sm 2xl:text-base">
        - Browser Settings: Most browsers allow you to manage cookies through
        their settings. You can choose to block, delete, or allow cookies, but
        note that blocking certain types of cookies may impact your experience
        on HuntGrounds.com.
      </p>
      <p className="text-sm 2xl:text-base">
        - Opt-Out Tools: You can opt out of targeted advertising cookies by
        adjusting your browser settings or using opt-out tools provided by
        industry organizations such as the Digital Advertising Alliance (DAA) or
        the European Interactive Digital Advertising Alliance (EDAA).
      </p>
      <p className="text-sm 2xl:text-base"> 5. Changes to This Policy</p>
      <p className="text-sm 2xl:text-base">
        We may update this Cookie Policy from time to time to reflect changes in
        our practices or for other operational, legal, or regulatory reasons.
        When we make changes, we will update the "Last Updated" date at the top
        of this page. We encourage you to review this policy periodically to
        stay informed about how we use cookies.
      </p>
      <p className="text-sm 2xl:text-base"> 6. Contact Us</p>
      <p className="text-sm 2xl:text-base">
        If you have any questions or concerns about this Cookie Policy, please
        contact us at:
      </p>
      <p className="text-sm 2xl:text-base">
        HuntGrounds.com <br /> Email: Legal@HuntGrounds.com
      </p>
      <p className="text-sm 2xl:text-base">
        By using HuntGrounds.com, you consent to the use of cookies as outlined
        in this policy.
      </p>
    </div>
  );
};

export default page;
