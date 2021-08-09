import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

export default function AboutUs() {
  return (
    <div>
    <div className="container-fluid">
      <div>
        <h3>Welcome to Good Samaritan Finder</h3>
      </div>
      <div>
        <p>
          Our generation has lived to see the unthinkable - a global pandemic
          and challenges emerging from changing climatic conditions. While
          some of us have been fortunate to endure through the rough times,
          there have been challenging and pressing times where some of us were
          desperately seeking help.
        </p>
        <p>
          <b>Good Samaritan Finder</b> is a non-profit organization which
          connects volunteers (Good Samaritans) with beneficiaries during
          unanticipated times. This started out as an effort to help
          volunteers organize the work that they can sign up for without
          getting overwhelmed with the requests so that they can continue what
          they do best - helping people.
        </p>
        <p>
          Amid India&apos;s 2nd Covid-19 wave, a Good Samaritan (Sonu Sood)
          had stepped up to help out families who needed hospital beds,
          hospital cylinders, etc. It did not take too long before his Twitter
          exploded with tweets for help. And this was what he had posted as a
          response:
        </p>
        <TwitterTweetEmbed tweetId="1391298808735174659" />
        <p>
          <b>Good Samaritan Finder</b> tries to solve this issue. By
          registering as a Good Samaritan on our platform, you could sign up
          to help a fixed number of beneficiaries who automatically get
          matched if the services provided by the Good Samaritan matches the
          services the beneficiaries are seeking help for. This would help the
          the contact details of the volunteers so that, volunteers can reach
          out to the beneficiaries and arrange for the much needed help.
        </p>

        <br />
        <div className="row">
          <div className="col-sm">
            <img src="src/images/elderly-hand.jpeg" alt="Elderly Hands" width="100%" className="rounded" />
          </div>

          <div className="col-sm">
            <img src="src/images/joel-muniz-qvzjG2pF4bE-unsplash.jpeg" alt="Elderly Hands" width="100%" className="rounded"/>
          </div>
        </div>
        <p>
          Photo by
          <a href="https://unsplash.com/@jmuniz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Joel Muniz
          </a>
          on
          <a href="https://unsplash.com/s/photos/charity?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
        <p className="col-sm">
          With changing climatic conditions to an ongoing pandemic, a few
          people in the community might find themselves needing help. Our
          volunteers are a click away from getting that extra bit of support.
        </p>
      </div>
    </div>
  </div>
  );
}
