import Image from "next/image";
import React from "react";

const GunSafetyPage = () => {
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
        <span className="text-primary-50">HuntGrounds</span> Gun Safety
      </h4>
      <p className="text-sm 2xl:text-base">
        At HuntGrounds.com, we prioritize the safety of our community, and
        understanding gun safety is crucial for all hunters. Whether you're a
        seasoned professional or new to hunting, following proper gun safety
        practices can prevent accidents and ensure a safe experience for
        everyone involved.
      </p>
      <p className="text-sm 2xl:text-base">
        1. Always Treat Every Gun as Loaded <br />
        Even if you believe a gun is unloaded, always treat it as if it is.
        Check the firearm’s status every time you pick it up and never assume
        it’s safe. Handle all firearms with care and respect at all times.
      </p>
      <p className="text-sm 2xl:text-base">
        2. Keep Your Finger Off the Trigger Until Ready to Shoot <br />
        Avoid placing your finger on the trigger until you have aimed at your
        target and are ready to fire. Keeping your finger off the trigger
        reduces the risk of accidental discharge.
      </p>
      <p className="text-sm 2xl:text-base">
        3. Never Point the Gun at Anything You Don’t Intend to Shoot <br />
        Always point the muzzle of your firearm in a safe direction, whether
        it’s loaded or not. Make sure that the area surrounding your target is
        safe and clear of people, animals, or objects.
      </p>
      <p className="text-sm 2xl:text-base">
        4. Be Aware of Your Target and What’s Beyond It <br />
        Before pulling the trigger, always confirm your target and what lies
        beyond it. Bullets can travel significant distances, so ensure the area
        is clear and safe.
      </p>
      <p className="text-sm 2xl:text-base">
        5. Store Firearms Safely <br />
        When not in use, firearms should be stored in a secure location, such as
        a locked gun safe or a locked cabinet. Ensure that firearms are unloaded
        before storage and that ammunition is stored separately.
      </p>
      <p className="text-sm 2xl:text-base">
        6. Wear Proper Protection <br />
        Always wear eye and ear protection when shooting to safeguard against
        injury from loud noises or debris. Many gun-related injuries can be
        prevented with the proper protective gear.
      </p>
      <p className="text-sm 2xl:text-base">
        7. Use the Right Ammunition <br />
        Always use the correct ammunition for your firearm. Using the wrong type
        of ammunition can cause malfunctions or damage to the gun, potentially
        leading to injury or death.
      </p>
      <p className="text-sm 2xl:text-base">
        8. Maintain Your Firearm <br />
        Regularly clean and inspect your firearm to ensure it is in proper
        working condition. Faulty or dirty firearms can lead to malfunctions,
        which increase the risk of accidents.
      </p>
      <p className="text-sm 2xl:text-base">
        9. Know Your Local Laws and Regulations <br />
        Hunting laws and firearm regulations vary by location. Make sure you
        understand and follow all local, state, and federal laws related to
        firearm ownership, usage, and transportation.
      </p>
      <p className="text-sm 2xl:text-base">
        10. Practice Safe Transport <br />
        When transporting firearms, ensure they are unloaded and properly stored
        in a secure case. Never transport a loaded gun in your vehicle.
      </p>
      <p className="text-sm 2xl:text-base">
        11. Educate Others <br />
        If you’re hunting with others, particularly new hunters, ensure they are
        familiar with these gun safety rules. Sharing your knowledge promotes a
        culture of safety within the hunting community.
      </p>
      <p className="text-sm 2xl:text-base">
        By following these gun safety guidelines, you can help ensure that your
        hunting experience is both safe and enjoyable.
      </p>
    </div>
  );
};

export default GunSafetyPage;
