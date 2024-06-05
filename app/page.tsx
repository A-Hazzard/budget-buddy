import Button from "@/components/Button";
import Header from "@/components/home/Header";
import Image from "next/image";
import styles from "./home.module.css"
import ImageWrapper from "@/components/ImageWrapper";
export default function Home() {
  return (
    <div>
      <Header />

        {/* Call to Action */}
        <section className={styles.callToAction}>

          <div className=" lg:flex lg:flex-row-reverse lg:items-center">
            <ImageWrapper
              divClassName="w-[90%]"
              src="/CTA.svg"
              alt="guys on his phone"
            />
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="lg:mt-0 lg:text-left">
                  Effortless Financial Management
                </h1>

                <p className="mt-3  text-center lg:mt-0 lg:text-left">
                  A straightforward zero-based budgeting application that allows you to
                  monitor your finances effortlessly, whenever and wherever you need.
                </p>
              </div>

              <Button className="mt-5 mx-auto" text="Create An Account" />
            </div>
          </div>

          <ImageWrapper
            divClassName="w-full lg:w-[50%] h-13 mx-auto mt-5"
            src="/collaboration.svg"
            alt="collaboration banner"
          />

        </section>

        <section className={styles.bottomSection}>
          <h2>Maximize Your Finances Effortlessly</h2>

          <div className="lg:flex lg:flex-row lg:items-center mt-5">
            <ImageWrapper
              divClassName="w-full"
              src="/savings.svg"
              alt="money"
            />

            <div>
              <h3 className="lg:text-left">
                Craft a Budget as Distinctive as Your Lifestyle
              </h3>


              <p className="mt-3 font-semibold  text-center lg:text-left">
                With EveryDollar, you can effortlessly plan for all your needs, whether it&apos;s saving for a cutting-edge

                mermaid costume or stocking up on snacks for a cozy staycation. Customize your budget with unlimited
                categories!
              </p>
            </div>
          </div>

          <div className="lg:flex lg:flex-row-reverse lg:items-center mt-5">
            <ImageWrapper
              divClassName="w-full"
              src="/moneyTracking.svg"
              alt="money tracking"
            />
            <div>
              <h3 className="lg:text-left">
                Manage Your Finances Conveniently
              </h3>

            <p className="text-center font-semibold lg:text-left">
                Stay on top of your finances with real-time updates from your bank. Easily monitor your balances and
                upcoming expenses on the go. EveryDollar keeps you informed, so you can stay on track!
              </p>
            </div>
          </div>

          <div className="lg:flex lg:flex-row lg:items-center mt-5">
            <ImageWrapper src="/calender.svg" alt="calender" />

            <div>
              <h3 className="text-center lg:text-left">
                View All Your Financial Accounts Consolidated
              </h3>

            <p className="text-center font-semibold lg:text-left">
                Manage all your financial accounts effortlessly in a single location, eliminating the need to juggle
                multiple apps to keep track of your finances.
            </p>
            </div>
          </div>

        </section>
    </div>
  );
}
