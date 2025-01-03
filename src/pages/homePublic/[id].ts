import { HomePublic } from "@/features/userHub/ui/homePublic/PublicHome";
import { PublicLayout } from "@/common/components/Layout/PublicLayout";
import { User } from "@/features/userHub/ui/homePublic/User";

User.getLayout = PublicLayout;
export default User;
