import Image from "next/image";
import React from "react";

const RiskDisclosurePage = () => {
  return (
    <div className="min-h-screen bg-[#000214] relative p-4 md:p-12 space-y-4 md:space-y-3">
      <Image
        src={"/images/footerBg.svg"}
        alt="bg"
        width={500}
        height={500}
        className="  opacity-40 absolute right-0"
      />
      <h4 className="text-2xl 2xl:text-3xl mb-4">
        <span className="text-primary-50">HuntGrounds</span> Risk Disclosure
      </h4>
      <p className="text-sm 2xl:text-base">Last Updated: June 22, 2024</p>
      <p className="text-sm 2xl:text-base">
        At HuntGrounds.com ("we," "us," or "our"), we aim to provide a platform
        that helps users find hunting grounds efficiently. However, hunting
        carries inherent risks, and it is important to be aware of them. This
        Risk Disclosure outlines the potential risks associated with hunting
        activities, and by using our website, you acknowledge and accept these
        risks.
      </p>
      <p className="text-sm 2xl:text-base">
        1. Nature of Hunting Activities <br />
        Hunting is a physically demanding activity that may involve exposure to
        dangerous wildlife, adverse weather conditions, and unfamiliar terrain.
        As such, you should fully understand the risks before engaging in any
        hunting activities on the grounds listed on HuntGrounds.com.
      </p>
      <p className="text-sm 2xl:text-base">
        2. Third-Party Responsibility <br />
        HuntGrounds.com does not own or manage any of the hunting grounds listed
        on our platform. We provide a platform for users to connect with
        landowners and operators. The safety, accessibility, and condition of
        the hunting grounds are the responsibility of the respective landowners
        and operators.
        <br />
        You are responsible for performing your own due diligence before
        entering any hunting grounds, and we strongly recommend confirming all
        details directly with the landowner or operator prior to visiting.
      </p>
      <p className="text-sm 2xl:text-base">
        3. Personal Risk <br />
        By using our platform and participating in hunting activities, you
        assume all risks associated with hunting, including but not limited to:
        <br />
        - Physical injury or harm caused by wildlife or environmental
        conditions. <br />
        - Accidents involving weapons, gear, or other hunting equipment. <br />-
        Health issues due to physical exertion or adverse weather conditions.
      </p>
      <p className="text-sm 2xl:text-base">
        4. No Liability <br />
        HuntGrounds.com, its affiliates, officers, directors, employees, and
        agents are not liable for any loss, injury, or damage resulting from:{" "}
        <br />
        - Any accidents, injuries, or fatalities that may occur during hunting
        activities. <br />
        - Disputes or issues between users and landowners/operators. <br />-
        Property damage, loss, or theft occurring on hunting grounds.
      </p>
      <p className="text-sm 2xl:text-base">
        5. User Responsibility <br />
        You are solely responsible for ensuring that you are physically and
        mentally capable of participating in hunting activities. You should seek
        medical advice if you have any concerns about your health or ability to
        hunt safely.
      </p>
      <p className="text-sm 2xl:text-base">
        6. Legal Compliance <br />
        Users are responsible for ensuring they comply with all local, state,
        and federal hunting laws, regulations, and permit requirements. Failure
        to comply with these laws may result in legal action, penalties, or
        fines, and HuntGrounds.com is not responsible for any consequences
        arising from non-compliance.
      </p>
      <p className="text-sm 2xl:text-base">
        7. Acknowledgment of Risk <br />
        By using HuntGrounds.com and participating in hunting activities, you
        acknowledge and accept the risks outlined in this Risk Disclosure. You
        agree to assume full responsibility for your safety and the outcome of
        your hunting activities.
      </p>
      <p className="text-sm 2xl:text-base">
        8. Contact Us <br />
        If you have any questions or concerns about this Risk Disclosure, please
        contact us at:
        <br />
        HuntGrounds.com <br />
        Email: Legal@HuntGrounds.com
      </p>
      <p className="text-sm 2xl:text-base">
        By using HuntGrounds.com, you confirm that you have read, understood,
        and agreed to this Risk Disclosure.
      </p>
    </div>
  );
};

export default RiskDisclosurePage;
