'use client'
import Button from "@/components/Button";
import Header from "@/components/home/Header";
import styles from "./home.module.css"
import ImageWrapper from "@/components/ImageWrapper";
import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        user ? setUser(user) : setUser(null)
      });
    }
  }, []);

  return (
    <div>
      <Header />

      {/* Call to Action */}
      <section className={styles.callToAction}>

        <div className=" lg:flex lg:flex-row-reverse lg:items-center">
          <ImageWrapper
            divClassName="w-[60%]"
            src="/CTA.svg"
            alt="guys on his phone"
          />
          <div className="flex flex-col justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <h1 className="lg:mt-0 lg:text-left">
                Effortless Financial Management
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
            >
              <p className="mt-3  text-center lg:mt-0 lg:text-left">
                A straightforward zero-based budgeting application that allows you to
                monitor your finances effortlessly, whenever and wherever you need.
              </p>
            </motion.div>

            <Button
              path={user ? "dashboard" : "signup"}
              text={user ? "Go to Dashboard" : "Create Account"}
              className="lg:w-[40%] mt-5 mx-auto lg:mx-0"
            />
          </div>
        </div>

        <ImageWrapper
          divClassName="w-full lg:w-[30%] h-13 mx-auto mt-5"
          src="/collaboration.svg"
          alt="collaboration banner"
        />

      </section>

        <section className={`${styles.bottomSection}`}>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="mt-5"
        >
          Maximize Your Finances Effortlessly
        </motion.h2>

        <div className="xl:px-20 lg:flex lg:justify-center lg:gap-10 lg:flex-row lg:items-center mt-5">
          <ImageWrapper
            divClassName="w-full lg:w-[80%] xl:w-[50%]"
            src="/savings.svg"
            alt="money"
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
            className="lg:w-[80%] xl:w-[50%]"
          >
            <h3 className="lg:text-left lg:text-4xl ">
              Craft a Budget as Distinctive as Your Lifestyle
            </h3>

            <p className="mt-3 w-full font-semibold  text-center lg:text-left">
              With Budget Buddy, you can effortlessly plan for all your needs, whether it&apos;s saving for a cutting-edge
              mermaid costume or stocking up on snacks for a cozy staycation. Customize your budget with unlimited
              categories!
            </p>
          </motion.div>
        </div>

        <div className="lg:px-20 mt-5 lg:flex lg:justify-center lg:flex-row-reverse lg:gap-10 lg:items-center">
          <ImageWrapper
            divClassName="w-full lg:w-[80%]"
            src="/moneyTracking.svg"
            alt="money tracking"
          />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
          >
            <h3 className="lg:text-left">Manage Your Finances Conveniently</h3>
            <p className="text-center w-full font-semibold lg:text-left">
              Stay on top of your finances with real-time updates from your bank. Easily
              monitor your balances and upcoming expenses on the go. Budget Buddy keeps
              you informed, so you can stay on track!
            </p>
          </motion.div>
        </div>

        <div className="lg:px-15 lg:flex lg:flex-row lg:items-center mt-5">
          <ImageWrapper src="/calender.svg" alt="calender" />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.4 }}
          >
            <h3 className="text-center lg:text-left">
              View All Your Financial Accounts Consolidated
            </h3>
            <p className="text-center lg:text-left font-semibold lg:w-[80%]">
              Manage all your financial accounts effortlessly in a single location,
              eliminating the need to juggle multiple apps to keep track of your
              finances.
            </p>
          </motion.div>
        </div>


        </section>
    </div>
  );
}
