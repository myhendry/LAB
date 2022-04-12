import { GetStaticProps, NextPage } from "next";
import Stripe from "stripe";

import { Layout } from "../../components/common";

interface IProps {
  plans: {
    id: string;
    name: string;
    price: number;
    interval: string;
    currency: string;
  }[];
}

const Plans: NextPage<IProps> = ({ plans }) => {
  const renderPlans = () => {
    return plans.map((p) => (
      <div className="border rounded shadow p-6 m-2" key={p.id}>
        <h2>{p.name}</h2>
        <p>
          {p.price / 100} / {p.interval}
        </p>
      </div>
    ));
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-around">
        {renderPlans()}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Instantiate Stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2020-08-27",
  });

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async (price: any) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        currency: price.currency,
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return {
    props: {
      plans: sortedPlans,
    },
  };
};

export default Plans;
