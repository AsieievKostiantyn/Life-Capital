import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Button } from '@mantine/core';

import { USER_ROUTES } from '@/shared/router';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img
        src="hero-photo.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-[1400px] mx-auto h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <FormattedMessage id="hero.title" />
          </h1>
          <p className="max-w-[600px] text-lg mb-12">
            <FormattedMessage id="hero.description" />
          </p>
          <Button
            component={Link}
            to={USER_ROUTES.LOGIN}
            size="xl"
            radius="lg"
            styles={{
              root: {
                '--button-bg': 'transparent',
                '--button-bd': '2px solid white',
                '--button-hover': 'white',
                '--button-hover-color': 'red',
              },
            }}
          >
            <FormattedMessage id="hero.tryIt" />
          </Button>
        </div>
      </div>
    </section>
  );
};
