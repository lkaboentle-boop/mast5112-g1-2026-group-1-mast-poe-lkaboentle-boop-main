declare module "expo-image-picker" {
  export function requestMediaLibraryPermissionsAsync(): Promise<{
    status: string;
  }>;
  export function launchImageLibraryAsync(options?: any): Promise<any>;
  export const MediaTypeOptions: {
    Images: string;
    Videos: string;
    All: string;
  };
}
