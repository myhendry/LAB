import { NextPage } from "next";
import Link from "next/link";

interface IProps {}

export const Hero: NextPage<IProps> = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Industrial and Commercial</h1>
          <p className="mb-5 text-justify">
            Our Team have more than a decade of experience handling Industrial
            and Commercial properties in Singapore. This includes offices, B1
            Light Industrial, B2 Light Industrial Factories, showrooms etc.
            <Link href="#listing-section">
              <a className="underline mx-2">View Listings</a>
            </Link>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            odio beatae nam aliquid illum accusantium quisquam nulla quis
            accusamus facilis officiis obcaecati vel expedita fugit odit sed
            tenetur atque modi, distinctio quia ex suscipit ipsum qui. Quae
            rerum architecto nulla cumque ipsa totam iste odio sint dolorum
            asperiores cupiditate, in quidem quas minus officia voluptas ut
            explicabo laboriosam. Eaque impedit enim voluptates, rerum aliquam
            veniam ipsam molestiae a delectus, explicabo, sit ullam! Quisquam,
            cumque repellat aliquam voluptatibus quibusdam perferendis molestiae
            ratione rerum dolorum. Vitae dolorem sint esse similique veritatis
            ipsa architecto delectus facere temporibus repudiandae, perspiciatis
            quas consectetur asperiores quam! Accusamus mollitia ipsa aliquam
            dicta asperiores, quas commodi placeat accusantium illum? Sint ea
            corporis fuga modi voluptatum fugiat quo?
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
