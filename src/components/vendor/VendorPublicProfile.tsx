"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  useFollowUnfollowVendorMutation,
  useGetVendorByIdQuery,
} from "@/redux/features/vendors/vendorApi";
import Loading from "../message/Loading";
import {
  Calendar,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const socialIcons: Record<string, JSX.Element> = {
  facebook: <Facebook className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
};

const getSocialIcon = (platform: string) =>
  socialIcons[platform?.toLowerCase()] || <Globe className="h-5 w-5" />;

const VendorPublicProfile = ({ vendorId }: { vendorId: string }) => {
  // ----------------- redux --------------------
  const { data: vendor, isLoading } = useGetVendorByIdQuery(vendorId, {
    skip: !vendorId,
  });
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const [followUnfollowVendor, { isLoading: isFUnfollowLoading }] =
    useFollowUnfollowVendorMutation();

  // ---------------- react --------------------
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  const {
    logo,
    shopName,
    description,
    avgRating = 0,
    followers = [],
    address,
    contact,
    createdAt,
    socialLinks = [],
  } = vendor?.data || {};

  const isFollowing = followers?.includes(userId);

  //  handle follow unfollow
  const handleFollowUnfollow = async (vendorId: string) => {
    if (!userId) {
      router.push(
        `/login?from=${encodeURIComponent(window.location.pathname)}`
      );
    } else {
      try {
        await followUnfollowVendor(vendorId).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="w-32 h-32">
            {logo ? (
              <AvatarImage src={logo} alt={shopName} />
            ) : (
              <AvatarFallback>{shopName?.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{shopName}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <Badge variant="secondary" className="text-sm">
                <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                {avgRating.toFixed(1)} ({followers.length} followers)
              </Badge>
              <Badge variant="outline" className="text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {address}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Phone className="h-4 w-4 mr-1" />
                {contact}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {new Date(createdAt).toLocaleDateString()}
              </Badge>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button
                className="w-[100px]"
                disabled={isFUnfollowLoading}
                onClick={() => handleFollowUnfollow(vendorId)}
                variant={isFollowing ? "outline" : "default"}
              >
                {isFUnfollowLoading
                  ? isFollowing
                    ? "Unfollowing..."
                    : "Following..."
                  : isFollowing
                  ? "Following"
                  : "Follow"}
              </Button>

              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              {socialLinks.map(
                (link: { platform: string; url: string }, index: number) => (
                  <Button key={index} variant="outline" size="icon" asChild>
                    <a
                      href={link?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getSocialIcon(link?.platform)}
                    </a>
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorPublicProfile;
