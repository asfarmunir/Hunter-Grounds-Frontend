import Image from "next/image";
import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#000214] relative p-4 md:p-12 space-y-4 md:space-y-3">
      <Image
        src={"/images/footerBg.svg"}
        alt="bg"
        width={500}
        height={500}
        className="  opacity-40 absolute right-0"
      />{" "}
      <h4 className="text-2xl 2xl:text-3xl mb-4">
        <span className="text-primary-50">HuntGrounds</span> Refund Policy
      </h4>
      <p className="text-sm 2xl:text-base">Last Updated: August 2, 2024</p>
      <p className="text-sm 2xl:text-base">
        At HuntGrounds.com, we are committed to ensuring you have a great
        experience when booking hunting trips. We understand that plans may
        change, and we have established the following refund policy to provide
        clarity around cancellations and refunds. Please review our policy
        carefully before making a booking.
      </p>
      <p className="text-sm 2xl:text-base font-bold">1. Cancellation Policy</p>
      <p className="text-sm 2xl:text-base">
        <span className="font-bold">- 48-Hour Cancellation Window:</span>
        <br />
        You may cancel your booking up to{" "}
        <b>48 hours before your scheduled trip</b> without being charged. If you
        cancel within this period, you will be eligible for a full refund. This
        policy gives you the flexibility to adjust your plans if necessary
        without incurring any costs.
      </p>
      <p className="text-sm 2xl:text-base">
        <span className="font-bold">
          - Cancellations Within 48 Hours of the Trip:
        </span>
        <br />
        If you need to cancel less than 48 hours before your trip, we will not
        be able to issue a refund. This is because last-minute cancellations may
        affect both landowners and other participants, and it can be challenging
        to fill those slots at short notice.
      </p>
      <p className="text-sm 2xl:text-base font-bold">
        2. No Refunds After the Trip
      </p>
      <p className="text-sm 2xl:text-base">
        <span className="font-bold">- After the Trip:</span>
        <br />
        Once your hunting trip has been completed,{" "}
        <b>no refunds will be issued</b> under any circumstances. We encourage
        you to thoroughly check all trip details (such as dates, locations, and
        terms) prior to booking to ensure they align with your schedule and
        expectations.
      </p>
      <p className="text-sm 2xl:text-base font-bold">
        3. Exceptional Circumstances
      </p>
      <p className="text-sm 2xl:text-base">
        We understand that unforeseen events may occur, and in rare cases, we
        may consider refund requests on a discretionary basis. These
        circumstances could include extreme weather conditions, sudden health
        issues, or other emergencies that prevent you from attending your trip.
        However, any decisions on refunds due to these circumstances will be
        made at the sole discretion of HuntGrounds.com and are not guaranteed.
      </p>
      <p className="text-sm 2xl:text-base">
        Please note that these situations are exceptional, and the general rule
        is that cancellations within 48 hours and after the trip do not qualify
        for refunds.
      </p>
      <p className="text-sm 2xl:text-base font-bold">
        4. Booking Modifications
      </p>
      <p className="text-sm 2xl:text-base">
        If you wish to modify your booking, such as changing the date of your
        trip or the number of participants, please contact us as soon as
        possible. While we cannot guarantee that changes can always be made, we
        will do our best to accommodate your request if received{" "}
        <b>at least 48 hours before your trip</b>.
      </p>
      <p className="text-sm 2xl:text-base font-bold">
        5. How to Cancel or Modify a Booking
      </p>
      <p className="text-sm 2xl:text-base">
        To cancel or modify your booking, please contact us via email or through
        your HuntGrounds.com account. Be sure to provide your booking details
        and the reason for your cancellation or modification. Once we receive
        your request, we will process the cancellation or change and notify you
        of the outcome.
      </p>
      <p className="text-sm 2xl:text-base font-bold">6. Contact Us</p>
      <p className="text-sm 2xl:text-base">
        If you have any questions or require assistance with cancellations,
        modifications, or refunds, please reach out to us at:
      </p>
      <p className="text-sm 2xl:text-base">
        HuntGrounds.com <br />
        Email: Legal@HuntGrounds.com
      </p>
      <p className="text-sm 2xl:text-base font-bold">
        7. Acknowledgment of Terms
      </p>
      <p className="text-sm 2xl:text-base">
        By booking a trip on HuntGrounds.com, you agree to this Refund Policy
        and acknowledge that you have read and understood these terms. Please
        ensure you are familiar with this policy before making a reservation, as
        it will govern the terms of your cancellation and refund eligibility.
      </p>
      <p className="text-sm 2xl:text-base">
        This policy is in place to provide clarity and fairness to both hunters
        and landowners, ensuring that everyone involved can manage their
        schedules effectively. We thank you for choosing HuntGrounds.com and
        wish you a safe and successful hunting experience!
      </p>
    </div>
  );
};

export default RefundPolicyPage;
