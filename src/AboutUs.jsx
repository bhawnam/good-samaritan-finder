import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import about_img1 from './images/elderly-hand.jpeg'
import about_img2 from './images/joel-muniz-qvzjG2pF4bE-unsplash.jpeg'

export default function AboutUs() {
  return (
    <div>
    <div className="container-fluid">
      <div>
        <h3>Welcome to Good Samaritan Finder</h3>
      </div>
      <br/>
      <div>
        <h4> Our Mission </h4>
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
          getting overwhelmed with the requests and they can continue what
          they do best - helping people.
        </p>
         <hr/> <br />
        <h4> Our Inspiration </h4>
        <p>
          During to the pandemic, we have witnessed situations where elderly and high-risk personnel were left 
          without basic necessities like getting groceries and medications. In Texas during the cold front, 
          there have been cases where families were looking for food, water and a source of heat to keep their 
          families that were left without power and water, safe. In California, the continuously growing fires 
          have created a havoc and left people without food and water to survive. These are just a few instances where 
          people have been left helpless and hopeless.
        </p>
        <p>  
          Amid India&apos;s 2nd Covid-19 wave, a Good Samaritan (Sonu Sood)
          had stepped up to help out families who needed hospital beds,
          hospital cylinders, etc. It did not take too long before his Twitter
          exploded with tweets for help. And this was what he had posted as a
          response:
        </p>
        <div id="twitterTweet">
        <blockquote class="twitter-tweet">
          <a href="https://twitter.com/SonuSood/status/1391298808735174659?ref_src=twsrc%5Etfw">
          <p lang="en" dir="ltr">Yesterday I got close to 41660 requests
          <br />We try our best to reach out to all.
          <br />Which we can&#39;t..
          <br />If I try to reach out to everyone it will take me 14 years to do that.
          <br />That means it will be 2035</p> 🇮🇳🙏
          <p>&mdash; sonu sood (@SonuSood)</p>
          </a>
        </blockquote>
        </div>
        {/* <div id="twitterTweet">
        <TwitterTweetEmbed tweetId="1391298808735174659" />
        </div> */}
        <br />
        <p>
          These are just a few instances which inspired us to step up and build a platform to allow 
          Volunteers to come onboard and provide their services to those who need it.
        </p>
        <hr /> <br/>
        <h4> How are we trying to achieve our goal ? </h4>
        <br/>
        <p>
          <b>Good Samaritan Finder</b> tries to solve this issue. By
          registering as a Good Samaritan on our platform, you could sign up
          to help a fixed number of beneficiaries who automatically get
          matched if the services provided by the Good Samaritan matches the
          services the beneficiaries are seeking help for. This would help the
          the contact details of the volunteers so that, volunteers can reach
          out to the beneficiaries and arrange for the much needed help. We match the
          Volunteers and the Beneficiaries based on the services they are looking for
          and also make sure that the recipient is in the vicinity of the Volunteer
          helping out to not make the entire process overwhelming for both the 
          Beneficiary and Volunteer.
          </p>
          <p>
          In the social media age, it is easy for a person to volunteer. But, the fact is one can only volunteer part-time 
          or have the capacity to only help x number of people. In such cases, if one would offer their services 
          on social media platforms, their inbox would be flooded with help requests that they may not have the 
          bandwidth and/or the resources to handle. The goal of the platform is to only match beneficiaries and volunteers 
          in a given area and more importantly offer the ability to put in their date of availability.
        </p>

        <br />
        <div className="row">
          <div className="col-sm">
            <img src={about_img1} alt="Elderly Hands" width="100%" className="rounded" />
          </div>

          <div className="col-sm">
            <img src={about_img2} alt="Elderly Hands" width="100%" className="rounded"/>
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
