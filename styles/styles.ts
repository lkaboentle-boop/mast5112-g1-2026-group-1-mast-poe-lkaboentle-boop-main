import { Animated, StyleSheet, Dimensions } from "react-native";

export const palette = {
  canvas: "#FBF7F2",
  surface: "#FFFFFF",
  cream: "#F4EBE2",
  beige: "#E7D7C8",
  pink: "#D69AAF",
  accent: "#A85370",
  ink: "#4B393D",
  muted: "#88777A",
  border: "#E9DDE0",
  palePink: "#F7E5EA",
  onAccent: "#FFFDFC",
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const responsivePadding = Math.max(12, SCREEN_WIDTH * 0.05);

export const animatedOpacity = <T extends object>(
  opacity: Animated.Value,
  base: T,
) => ({
  ...base,
  opacity,
});

export const courseProgressWidth = (percent: number) => ({
  width: `${percent}%` as const,
});

const styles = StyleSheet.create({
  /* General layout */
  safeArea: {
    flex: 1,
    width: "100%",
    backgroundColor: palette.canvas,
    paddingTop: 8,
    minHeight: SCREEN_HEIGHT,
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    alignSelf: "center",
    backgroundColor: palette.canvas,
    paddingHorizontal: responsivePadding,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  pageContainer: {
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    alignSelf: "center",
    paddingHorizontal: responsivePadding,
    paddingTop: 20,
    paddingBottom: 32,
    backgroundColor: palette.canvas,
  },
  heading: {
    paddingTop: 20,
    color: palette.ink,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: palette.ink,
  },

  /* Inputs */
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: palette.surface,
    borderRadius: 8,
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: palette.surface,
    borderRadius: 8,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    width: "100%",
    marginBottom: 12,
    backgroundColor: palette.surface,
  },
  passwordInput: {
    flex: 1,
    padding: 8,
  },
  toggleText: {
    color: palette.accent,
    paddingHorizontal: 8,
    fontWeight: "600",
  },

  /* Buttons */
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: palette.accent,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: palette.surface,
    fontWeight: "600",
  },
  buttonDanger: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: palette.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: palette.palePink,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    color: palette.ink,
  },
  registerButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: palette.accent,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Home screen */
  chefIcon: {
    width: 135,
    height: 135,
    borderWidth: 3,
    borderColor: palette.ink,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 45,
    overflow: "hidden",
    backgroundColor: palette.cream,
  },
  chefIconImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
  },
  chefName: {
    fontSize: Math.min(38, SCREEN_WIDTH * 0.09),
    fontWeight: "800",
    color: palette.ink,
    marginTop: 20,
    textAlign: "center",
  },
  decorativeLines: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  line: {
    width: 80,
    height: 2,
    backgroundColor: palette.border,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: palette.muted,
    textAlign: "center",
    marginTop: 12,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  primaryButton: {
    width: "100%",
    height: 64,
    backgroundColor: palette.accent,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryButtonIcon: {
    color: palette.surface,
    fontSize: 26,
    fontWeight: "700",
  },
  primaryButtonText: {
    color: palette.surface,
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 10,
  },
  secondaryButton: {
    width: "100%",
    height: 64,
    borderWidth: 2,
    borderColor: palette.accent,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.surface,
    marginBottom: 18,
  },
  secondaryButtonIcon: {
    color: palette.ink,
    fontSize: 22,
  },
  secondaryButtonText: {
    color: palette.accent,
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 10,
  },

  /* Bottom nav */
  bottomNavigation: {
    width: "100%",
    height: 90,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomIcon: {
    fontSize: 24,
  },
  activeBottomText: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.ink,
    marginTop: 4,
  },
  bottomText: {
    fontSize: 14,
    color: palette.muted,
    marginTop: 4,
  },

  /* Shared header rows */
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: Math.min(20, SCREEN_WIDTH * 0.05),
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
    marginTop: -2,
    marginBottom: 6,
  },

  /* Profile screen */
  headerContainer: {
    width: "100%",
    height: 3,
    backgroundColor: palette.accent,
    marginTop: -2,
  },
  headerButtonText: {
    fontSize: 16,
    color: palette.ink,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: palette.cream,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 14,
    overflow: "hidden",
    alignSelf: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileImagePlaceholder: {
    color: palette.muted,
    textAlign: "center",
    paddingHorizontal: 18,
  },
  saveButton: {
    marginTop: 14,
    backgroundColor: palette.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  saveButtonText: {
    color: palette.surface,
    fontWeight: "700",
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: palette.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  logoutButtonText: {
    color: palette.surface,
    fontWeight: "700",
  },

  /* Small headings and text used across detail screens */
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: palette.ink,
  },
  info: {
    fontSize: 16,
    color: palette.ink,
    marginBottom: 8,
    textAlign: "center",
  },

  /* Add Item list page */
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
  courseRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
    gap: 6,
  },
  courseButton: {
    marginRight: 6,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: palette.cream,
    borderColor: "transparent",
    minWidth: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  courseButtonSelected: {
    backgroundColor: palette.accent,
    borderColor: palette.accent,
  },
  courseButtonText: {
    color: palette.ink,
  },
  courseButtonTextSelected: {
    color: palette.surface,
  },
  selectionText: {
    fontSize: 14,
    color: palette.muted,
    marginTop: 6,
    marginBottom: 10,
  },

  /* Menu card list */
  menuCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: palette.surface,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: palette.cream,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  imageText: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
  },
  itemDescription: {
    fontSize: 13,
    color: palette.muted,
  },
  courseBadge: {
    backgroundColor: palette.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  courseText: {
    fontSize: 12,
    color: palette.ink,
  },
  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
  },
  arrow: {
    fontSize: 20,
    color: palette.border,
  },

  /* Header search */
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  headerButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 18,
  },
  iconTextSmall: {
    fontSize: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    padding: 8,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  filterLabel: {
    fontSize: 14,
    color: palette.ink,
  },
  courseSelector: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: palette.cream,
  },
  selectedCourse: {
    fontSize: 14,
    fontWeight: "600",
  },
  list: {
    flexGrow: 1,
    paddingBottom: 12,
  },
  statisticsContainer: {
    width: "100%",
    padding: 12,
    backgroundColor: palette.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.cream,
    marginTop: 12,
  },
  statisticsText: {
    fontSize: 16,
    color: palette.ink,
    marginBottom: 6,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    marginTop: 12,
    color: palette.muted,
  },
  addButton: {
    width: "100%",
    backgroundColor: palette.accent,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 40,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  addButtonText: {
    color: palette.surface,
    fontWeight: "800",
  },

  /* Modal filter */
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(75,57,61,0.42)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterModal: {
    width: "85%",
    backgroundColor: palette.surface,
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: palette.cream,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterOptionText: {
    fontSize: 14,
    color: palette.ink,
  },
  selectedFilterText: {
    color: palette.accent,
    fontWeight: "700",
  },
  checkMark: {
    color: palette.accent,
    fontWeight: "700",
  },

  /* Signup page */

  logo: {
    fontSize: 50,
    textAlign: "center",
  },

  appName: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  login: {
    color: palette.accent,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },

  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 8,
  },
  genderOption: {
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: palette.cream,
  },
  genderOptionSelected: {
    backgroundColor: palette.accent,
  },
  genderText: {
    color: palette.ink,
  },
  genderTextSelected: {
    color: palette.surface,
    fontWeight: "700",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 16,
    gap: 12,
  },

  /* Ribbon login */
  ribbonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  actionButtonContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  ribbonIcon: {
    width: 50,
    height: 50,
  },
  ribbonButtonWrap: {
    padding: 6,
  },
  ribbonButton: {
    backgroundColor: palette.palePink,
    padding: 8,
    fontWeight: "700",
  },
  loginButton: {
    backgroundColor: palette.accent,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: palette.surface,
    fontWeight: "700",
  },
  bottomImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },

  /* Misc */
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
    alignItems: "center",
  },
  loginPromptText: {
    color: palette.muted,
  },
  loginLinkText: {
    color: palette.accent,
    fontWeight: "700",
  },
  loginBrandTitle: {
    marginLeft: 8,
    marginBottom: 0,
    flex: 1,
  },
  loginChefImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  signupChefImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  signupHeading: {
    alignItems: "center",
  },
  addMenuRoot: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  addMenuScroll: {
    width: "100%",
    height: "100%",
  },
  addMenuContent: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    paddingBottom: 200,
  },
  dishImagePicker: {
    height: 180,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.cream,
    marginBottom: 16,
  },
  dishImagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dishImagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dishImagePlaceholderIcon: {
    fontSize: 34,
  },
  dishImagePlaceholderText: {
    marginTop: 8,
    color: palette.accent,
    fontWeight: "700",
  },
});

export const inputFieldStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: palette.ink,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: palette.pink,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 4,
    fontSize: 16,
    backgroundColor: palette.surface,
  },
});

export const homeStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.canvas,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 40,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  overline: {
    fontSize: 8,
    letterSpacing: 2.1,
    color: palette.muted,
    fontWeight: "700",
    marginBottom: 5,
  },

  brand: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 3,
    color: palette.ink,
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.palePink,
    alignItems: "center",
    justifyContent: "center",
  },

  profile: { 
    fontSize: 21, 
    color: palette.accent 
  },

  hero: {
    backgroundColor: palette.accent,
    borderRadius: 24,
    padding: 25,
    minHeight: 250,
    justifyContent: "center",
    overflow: "hidden",
  },
  heroAccent: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: palette.pink,
    opacity: 0.22,
    top: -90,
    right: -45,
  },
  kicker: {
    fontSize: 9,
    letterSpacing: 2.5,
    color: palette.palePink,
    fontWeight: "800",
  },
  name: {
    fontSize: 32,
    color: palette.onAccent,
    fontWeight: "700",
    marginTop: 8,
  },
  copy: {
    fontSize: 13,
    color: "#F8EAF0",
    lineHeight: 20,
    marginTop: 9,
    maxWidth: 270,
  },
  rule: { 
    height: 1, 
    backgroundColor: "#C77F95", 
    marginVertical: 20 
  },

  small: {
    fontSize: 8,
    letterSpacing: 1.8,
    color: palette.palePink,
    fontWeight: "800",
  },
  countRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginTop: 7 
  },

  count: { 
    fontSize: 31, 
    color: palette.onAccent, 
    fontWeight: "800" 
  },

  countCaption: {
    fontSize: 11,
    color: "#F8EAF0",
    marginLeft: 10,
    lineHeight: 16,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },
  section: { 
    fontSize: 19, 
    fontWeight: "800", 
    color: palette.ink 
  },

  sectionNote: {
    fontSize: 8,
    letterSpacing: 1.3,
    color: palette.muted,
    fontWeight: "700",
  },
  primary: {
    backgroundColor: palette.cream,
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
  },
  cardKicker: {
    fontSize: 8,
    letterSpacing: 1.6,
    color: palette.accent,
    fontWeight: "800",
  },
  cardTitle: {
    fontSize: 19,
    color: palette.ink,
    fontWeight: "800",
    marginTop: 5,
  },
  cardCopy: { 
    fontSize: 11, 
    color: palette.muted, 
    marginTop: 5 
  },

  arrow: { 
    fontSize: 27, 
    color: palette.accent 
  },

  row: { 
    flexDirection: "row", 
    gap: 12, marginTop: 12 
  },

  tile: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: 17,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
    minHeight: 142,
  },
  tileIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: palette.palePink,
    alignItems: "center",
    justifyContent: "center",
  },
  tileIcon: { 
    fontSize: 21, 
    color: palette.accent 
  },

  tileTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.ink,
    marginTop: 12,
  },
  tileCopy: {
    fontSize: 10,
    color: palette.muted,
    marginTop: 5,
    lineHeight: 15,
  },
  serviceCard: {
    backgroundColor: palette.surface,
    borderRadius: 17,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  serviceIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: palette.palePink,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  serviceCopy: { flex: 1 },
  footer: {
    textAlign: "center",
    fontSize: 8,
    letterSpacing: 2,
    color: palette.muted,
    marginTop: 30,
  },
  brandDot: { color: palette.accent },
});

export const itemListStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.canvas,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 14 
  },

  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { 
    fontSize: 30, 
    color: palette.ink, 
    marginTop: -5 
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 2.2,
    color: palette.accent,
    fontWeight: "800",
  },
  title: {
    fontSize: 29,
    color: palette.ink,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  addCircle: {
    marginLeft: "auto",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { 
    color: palette.onAccent, 
    fontSize: 25 
  },

  intro: { 
    color: palette.muted, 
    fontSize: 13, 
    marginTop: 7, 
    marginBottom: 18 
  },

  statsStrip: {
    backgroundColor: palette.accent,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  statNumber: { 
    color: palette.onAccent, 
    fontSize: 22, 
    fontWeight: "700" 
  },

  statLabel: {
    color: palette.palePink,
    fontSize: 8,
    letterSpacing: 1.2,
    marginTop: 3,
  },
  divider: { 
    height: 30, 
    width: 1, 
    backgroundColor: palette.pink 
  },

  searchBox: {
    height: 49,
    borderRadius: 12,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchIcon: { 
    fontSize: 24, 
    color: palette.accent,
     marginRight: 9 
    },

  searchInput: { 
    flex: 1, 
    color: palette.ink, 
    fontSize: 13 
  },

  clear: { 
    fontSize: 23, 
    color: palette.muted, 
    paddingHorizontal: 5 
  },

  filterHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 8,
  },
  sectionTitle: { 
    fontSize: 19, 
    fontWeight: "700", 
    color: palette.ink 
  },

  filterButton: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: palette.palePink,
  },
  filterButtonText: { 
    color: palette.ink, 
    fontSize: 11, 
    fontWeight: "700"
   },

  resultText: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: palette.muted,
    marginBottom: 11,
  },
  card: {
    backgroundColor: palette.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
  },
  foodIcon: {
    width: 58,
    height: 58,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  foodEmoji: { 
    fontSize: 27 
  },

  info: { 
    flex: 1, 
    marginLeft: 12, 
    marginRight: 8 
  },

  itemName: { 
    fontSize: 14, 
    fontWeight: "700", 
    color: palette.ink 
  },

  description: {
    fontSize: 11,
    color: palette.muted,
    lineHeight: 16,
    marginTop: 4,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: palette.cream,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 7,
  },
  badgeText: {
    fontSize: 8,
    letterSpacing: 1,
    color: palette.accent,
    fontWeight: "800",
  },
  priceCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  price: {
    fontSize: 13,
    fontWeight: "800",
    color: palette.accent,
    marginTop: 4,
  },
  chevron: { 
    fontSize: 24, 
    color: palette.pink, 
    marginTop: "auto" 
  },
  
  bottom: {
    height: 58,
    borderTopWidth: 1,
    borderColor: palette.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: palette.canvas,
  },
  navMuted: { 
    fontSize: 11, 
    color: palette.muted, 
    fontWeight: "600" 
  },

  navActive: { 
    fontSize: 11, 
    color: palette.accent, 
    fontWeight: "800" 
  },

  empty: { 
    alignItems: "center", 
    paddingTop: 45 
  },

  emptyIcon: { 
    fontSize: 34 
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.ink,
    marginTop: 8,
  },

  emptyText: { 
    fontSize: 12, 
    color: palette.muted, 
    marginTop: 6 
  },

  reset: { 
    color: palette.accent, 
    fontWeight: "700", 
    marginTop: 15 
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(75,57,61,0.42)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: palette.canvas,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 35,
  },

  handle: {
    width: 38,
    height: 4,
    borderRadius: 3,
    backgroundColor: palette.beige,
    alignSelf: "center",
    marginBottom: 20,
  },

  sheetTitle: { 
    fontSize: 23, 
    fontWeight: "700", 
    color: palette.ink 
  },

  sheetSub: {
    fontSize: 12,
    color: palette.muted,
    marginTop: 5,
    marginBottom: 15,
  },

  option: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: palette.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionText: { 
    fontSize: 14, 
    color: palette.ink 
  },

  optionSelected: { 
    color: palette.accent, 
    fontWeight: "800" 
  },

  tick: { 
    color: palette.accent, 
    fontWeight: "800" 
  },

  done: {
    backgroundColor: palette.accent,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  doneText: { 
    color: palette.onAccent, 
    fontWeight: "700", 
    fontSize: 13 
  },

  loader: { 
    marginTop: 40 
  },

  listContent: { 
    paddingBottom: 30 
  },

  foodIconCream: { 
    backgroundColor: palette.cream 
  },

  foodIconPink: { 
    backgroundColor: palette.palePink 
  },

  foodIconBeige: { 
    backgroundColor: palette.beige 
  },

});

export const statisticsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.canvas,
    paddingHorizontal: 21,
    paddingTop: 12,
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 13 
  },

  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { 
    fontSize: 30, 
    color: palette.ink, 
    marginTop: -5 
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: palette.accent,
    fontWeight: "800",
  },
  title: { 
    fontSize: 27, 
    fontWeight: "700", 
    color: palette.ink 
  },
  intro: {
    fontSize: 13,
    color: palette.muted,
    marginTop: 13,
    marginBottom: 18,
  },
  hero: { 
    backgroundColor: palette.accent, 
    borderRadius: 17,
     padding: 22 
    },

  heroLabel: {
    fontSize: 9,
    letterSpacing: 1.8,
    color: palette.palePink,
    fontWeight: "700",
  },
  heroValue: {
    fontSize: 34,
    color: palette.onAccent,
    fontWeight: "800",
    marginTop: 8,
  },
  heroFoot: { 
    fontSize: 11, 
    color: "#F8EAF0", 
    marginTop: 5 
  },

  grid: { 
    flexDirection: "row",
     gap: 12, 
     marginTop: 13
     },

  metric: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: 14,
    padding: 17,
    borderWidth: 1,
    borderColor: palette.border,
  },
  metricNumber: { 
    fontSize: 23, 
    fontWeight: "800", 
    color: palette.accent 
  },

  metricLabel: {
    fontSize: 9,
    letterSpacing: 1.1,
    color: palette.muted,
    marginTop: 6,
    fontWeight: "700",
  },
  heading: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.ink,
    marginTop: 25,
    marginBottom: 14,
  },
  courseRow: { 
    marginBottom: 15 
  },

  courseTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  courseName: { 
    fontSize: 12, 
    fontWeight: "700", 
    color: palette.ink 
  },

  courseCount: { 
    fontSize: 11, 
    color: palette.muted
   },

  track: {
    height: 7,
    backgroundColor: palette.beige,
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: { 
    height: 7,
    backgroundColor: 
    palette.pink, 
    borderRadius: 5 
  },

  highlight: {
    backgroundColor: palette.surface,
    borderRadius: 13,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 13,
  },
  highlightIcon: {
    fontSize: 23,
    color: palette.accent,
    width: 32,
    textAlign: "center",
  },
  highlightImage: {
    width: 58,
    height: 58,
    borderRadius: 12,
    resizeMode: "cover",
    backgroundColor: palette.beige,
  },
  highlightContent: { flex: 1 },
  highlightLabel: {
    fontSize: 8,
    letterSpacing: 1.1,
    color: palette.accent,
    fontWeight: "800",
  },
  highlightName: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.ink,
    marginTop: 3,
  },
  highlightDetail: { 
    fontSize: 11, 
    color: palette.muted, 
    marginTop: 2 
  },

  button: {
    backgroundColor: palette.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: palette.onAccent,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  bottom: {
    height: 58,
    borderTopWidth: 1,
    borderColor: palette.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  nav: { 
    fontSize: 11, 
    color: palette.muted, 
    fontWeight: "600" 
  },

  navActive: { 
    fontSize: 11, 
    color: palette.accent, 
    fontWeight: "800"
   },

  scrollContent: { 
    paddingBottom: 30 
  },
});

export const itemDetailStyles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: palette.canvas, 
    padding: 22 
  },

  back: {
    marginBottom: 25 
  },

  backText: { 
    fontSize: 14, 
    color: palette.muted, 
    fontWeight: "700" 
  },

  art: {
    height: 190,
    borderRadius: 20,
    backgroundColor: palette.cream,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  foodImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },
  emoji: { fontSize: 70 },
  kicker: {
    fontSize: 10,
    letterSpacing: 2,
    color: palette.accent,
    fontWeight: "800",
  },
  name: { 
    fontSize: 29, 
    fontWeight: "800", 
    color: palette.ink, 
    marginTop: 8 
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.muted,
    marginTop: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: palette.accent,
    marginTop: 22,
  },
  stats: {
    flexDirection: "row",
    gap: 50,
    marginTop: 25,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: palette.border,
  },
  stat: { 
    fontSize: 21, 
    fontWeight: "800", 
    color: palette.accent 
  },

  label: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: palette.muted,
    marginTop: 4,
  },
  delete: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: palette.accent,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: palette.palePink,
  },
  deleteText: {
    fontSize: 11,
    color: palette.accent,
    fontWeight: "800",
    letterSpacing: 1,
  },
});

export const waiterStyles = StyleSheet.create({
  screen: { 
    flex: 1, 
    backgroundColor: palette.canvas 
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 13,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { 
    fontSize: 30, 
    color: palette.ink, 
    marginTop: -5 
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: palette.accent,
    fontWeight: "800",
  },
  title: { 
    fontSize: 27, 
    fontWeight: "700", 
    color: palette.ink 
  },

  content: { 
    paddingHorizontal: 20, 
    paddingBottom: 28 
  },

  hero: {
    backgroundColor: palette.accent,
    borderRadius: 21,
    padding: 21,
    marginTop: 10,
    overflow: "hidden",
  },
  heroMark: { 
    fontSize: 22, 
    color: palette.palePink, 
    marginBottom: 14 
  },
  heroEyebrow: {
    fontSize: 8,
    letterSpacing: 2,
    color: palette.palePink,
    fontWeight: "800",
  },
  heroTitle: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "700",
    color: palette.onAccent,
    marginTop: 7,
    maxWidth: 280,
  },
  heroCopy: {
    fontSize: 12,
    lineHeight: 18,
    color: "#F8EAF0",
    marginTop: 7,
    maxWidth: 290,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 11,
  },
  sectionTitle: { 
    fontSize: 19, 
    fontWeight: "800", 
    color: palette.ink 
  },

  sectionNote: {
    fontSize: 8,
    letterSpacing: 1.3,
    color: palette.muted,
    fontWeight: "700",
  },
  formCard: {
    backgroundColor: palette.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  fieldRow: { 
    flexDirection: "row", 
    gap: 12 
  },

  field: { 
    flex: 1
   },

  label: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: palette.accent,
    fontWeight: "800",
    marginBottom: 7,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 11,
    backgroundColor: palette.canvas,
    paddingHorizontal: 12,
    color: palette.ink,
    fontSize: 15,
  },
  menuHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 21,
    marginBottom: 8,
  },
  menuTitle: { 
    fontSize: 15, 
    fontWeight: "800", 
    color: palette.ink 
  },

  menuCaption: { 
    fontSize: 10, 
    color: palette.muted, 
    marginTop: 3 
  },

  itemCount: {
    minWidth: 30,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 15,
    backgroundColor: palette.palePink,
    alignItems: "center",
    justifyContent: "center",
  },
  itemCountText: { 
    color: palette.accent, 
    fontSize: 12, 
    fontWeight: "800"
   },

  dishRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: palette.border,
    paddingVertical: 8,
  },
  dishInfo: { 
    flex: 1, 
    paddingRight: 8 
  },

  dishName: { 
    fontSize: 12, 
    color: palette.ink, 
    fontWeight: "700" 
  },

  dishMeta: { 
    fontSize: 9, 
    color: palette.muted, 
    marginTop: 4 
  },
  quantityControl: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 7 
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonActive: { 
    backgroundColor: palette.accent
   },

  quantityButtonText: { 
    fontSize: 18, 
    lineHeight: 22, 
    color: palette.ink 
  },

  quantityButtonTextActive: { 
    color: palette.onAccent 
  },

  quantity: {
    minWidth: 17,
    textAlign: "center",
    fontSize: 12,
    color: palette.ink,
    fontWeight: "800",
  },
  saveButton: {
    backgroundColor: palette.accent,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 15,
  },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText: {
    color: palette.onAccent,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "800",
  },
  orderCard: {
    backgroundColor: palette.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: palette.border,
    padding: 14,
    marginBottom: 9,
  },
  orderTop: { 
    flexDirection: "row", 
    alignItems: "center" 
  },

  orderTableMark: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: palette.palePink,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  orderTableMarkText: {
    color: palette.accent,
    fontSize: 14,
    fontWeight: "800",
  },
  orderHeading: { 
    flex: 1 
  },

  orderTitle: { 
    fontSize: 13, 
    color: palette.ink, 
    fontWeight: "800" 
  },

  orderMeta: { 
    fontSize: 10, 
    color: palette.muted, 
    marginTop: 3 
  },

  orderTime: { 
    fontSize: 9, 
    color: palette.muted
   },

  orderDishes: {
    fontSize: 10,
    lineHeight: 16,
    color: palette.ink,
    marginTop: 12,
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: palette.border,
    borderStyle: "dashed",
    borderRadius: 15,
    padding: 18,
    alignItems: "center",
  },
  emptyTitle: { 
    fontSize: 13, 
    color: palette.ink, 
    fontWeight: "800" 
  },

  emptyText: {
    fontSize: 10,
    lineHeight: 16,
    color: palette.muted,
    textAlign: "center",
    marginTop: 5,
  },
  bottom: {
    height: 58,
    borderTopWidth: 1,
    borderColor: palette.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: palette.canvas,
  },
  nav: { 
    fontSize: 10, 
    color: palette.muted, 
    fontWeight: "600" 
  },
  navActive: { 
    fontSize: 10, 
    color: palette.accent, 
    fontWeight: "800" 
  },
});

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.accent,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: palette.ink,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  chefIconImage: { width: 120, height: 120, borderRadius: 90 },
  title: {
    color: palette.onAccent,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: palette.palePink,
    fontSize: 18,
    marginTop: 12,
    marginBottom: 28,
    textAlign: "center",
    opacity: 0.9,
  },
  activity: { marginTop: 8 },
});

export default styles;
