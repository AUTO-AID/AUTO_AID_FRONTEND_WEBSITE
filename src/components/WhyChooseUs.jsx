// import React from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { motion } from "framer-motion";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import BuildIcon from "@mui/icons-material/Build";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import CategoryIcon from "@mui/icons-material/Category";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import HeadphonesIcon from "@mui/icons-material/Headphones";
// import LayersIcon from "@mui/icons-material/Layers";
// import ReplayIcon from "@mui/icons-material/Replay";
// import SwapVertIcon from "@mui/icons-material/SwapVert";
// import LinkIcon from "@mui/icons-material/Link";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// const features = [
//   {
//     icon: DirectionsCarIcon ,
//     title: "24/7 Road Assistance",
//     description:
//       "We provide our best assistance to your vehicle round the clock so that you don’t have to suffer due to your vehicular problems. We provide immediate on-road help, anywhere, anytime.",
//   },
//   {
//     icon: LocalOfferIcon ,
//     title: "Affordable Pricing",
//     description:
//       "We provide our best assistance to your vehicle round the clock so that you don’t have to suffer due to your vehicular problems. We provide immediate on-road help, anywhere, anytime.",
//   },
//   {
//     icon: BuildIcon ,
//     title: "We Come to You!",
//     description:
//       "Whether you are in the office or gym or at watching movie with the family. You can schedule a call and we will come to work on your car. Whether you are in the vehicle or not, we facilitate real-time location, speed, and direction tracking to you.",
//   },
//   {
//     icon: VerifiedIcon ,
//     title: "Certified Mechanics",
//     description:
//       "We have a number of certified experts, technicians, and mechanics that specialize in various on-road emergency and garage-type services. With them, you can be least worried about your vehicle and you can expect fine service deliverables quickly.",
//   },
// ];
// const iconWrapperStyle = {
//   width: 70,
//   height: 70,
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   background: "linear-gradient(45deg, #B57EDC, #000)",
// };

// const iconInnerCircle = {
//   width: 66,
//   height: 66,
//   borderRadius: "50%",
//   background: "#fff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };
// const iconGradientText = {
//   background: "linear-gradient(45deg, #B57EDC, #000)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   fontSize: "28px",
// };
// const WhyChooseUs = () => {
//   return (
//     <Box
//       sx={{
//         py: 10,
//         px: { xs: 3, md: 10 },
//         backgroundColor: "#fff",
//         textAlign: "center",
//       }}
//     >
//       {/* الأيقونة فوق العنوان */}
//    <Box sx={iconWrapperStyle} mx="auto" mb={1}>
//           <Box sx={iconInnerCircle}>
//             <Inventory2Icon sx={iconGradientText} />
//           </Box>
//         </Box>

//       {/* العنوان */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           mb: 1,
//           letterSpacing: "1px",
//           background: "linear-gradient(90deg, #B57EDC, #000000)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         WHY CHOOSE US?
//       </Typography>

//       {/* وصف صغير */}
//       <Typography sx={{ color: "#444", mb: 6 }}>
//         We have enough reasons for you to choose our excellence services.
//       </Typography>

//       {/* الكروت */}
//     <Box
//   sx={{
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: "30px",
//   }}
// >

//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             whileHover={{ scale: 1.02 }}
//             transition={{ duration: 0.3 }}
//            style={{
//   width: "calc(50% - 15px)", 
//   maxWidth: "555px",
// }}

//           >
//             <Paper
//               elevation={0}
//               sx={{
//                 p: "25px 30px",
//                 borderRadius: "20px",
//                 backgroundColor: "white",
//                 boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
//                 display: "flex",
//                 alignItems: "flex-start",
//                 position: "relative",
//               }}
//             >
//               {/* أيقونة مع Gradient */}
//    <Box
//   sx={{
//     fontSize: "45px",
//     color: "#B57EDC",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     width: "60px",
//     display: "flex",
//     justifyContent: "center",
//     mt: 1,
//   }}
// >
//   <feature.icon fontSize="inherit" />
// </Box>


//               {/* الخط العمودي */}
//               <Box
//                 sx={{
//                   width: "2px",
//                   height: "100%",
//                   backgroundColor: "rgba(0, 0, 0, 0.3)",
//                   mx: "20px",
//                 }}
//               />

//               {/* النص */}
//               <Box sx={{ flexGrow: 1 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 600,
//                     mb: 1,
//                     background: "linear-gradient(90deg, #B57EDC, #000000)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   {feature.title}
//                 </Typography>
//                 <Typography sx={{ color: "#555", lineHeight: 1.7 }}>
//                   {feature.description}
//                 </Typography>
//               </Box>
//             </Paper>
//           </motion.div>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default WhyChooseUs;
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const features = [
  {
    icon: DirectionsCarIcon,
    title: "24/7 Road Assistance",
    description:
      "We provide our best assistance to your vehicle round the clock so that you don’t have to suffer due to your vehicular problems. We provide immediate on-road help, anywhere, anytime.",
  },
  {
    icon: LocalOfferIcon,
    title: "Affordable Pricing",
    description:
      "We provide our best assistance to your vehicle round the clock so that you don’t have to suffer due to your vehicular problems. We provide immediate on-road help, anywhere, anytime.",
  },
  {
    icon: BuildIcon,
    title: "We Come to You!",
    description:
      "Whether you are in the office or gym or at watching movie with the family. You can schedule a call and we will come to work on your car. Whether you are in the vehicle or not, we facilitate real-time location, speed, and direction tracking to you.",
  },
  {
    icon: VerifiedIcon,
    title: "Certified Mechanics",
    description:
      "We have a number of certified experts, technicians, and mechanics that specialize in various on-road emergency and garage-type services. With them, you can be least worried about your vehicle and you can expect fine service deliverables quickly.",
  },
];

// Styles remain fixed for the main icon structure
const iconWrapperStyle = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(45deg, #B57EDC, #000)",
};

const iconInnerCircle = {
  width: 66,
  height: 66,
  borderRadius: "50%",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const iconGradientText = {
  background: "linear-gradient(45deg, #B57EDC, #000)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "28px",
};

const WhyChooseUs = () => {
  return (
    <Box
    id= "features"
      sx={{
        // 1. Padding is responsive
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 }, 
        overflowX: "hidden", 
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      
      {/* Main Section Icon */}
    <Box sx={iconWrapperStyle} mx="auto" mb={1}>
                <Box sx={iconInnerCircle}>
            <Inventory2Icon sx={iconGradientText} />
         </Box>
       </Box>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          letterSpacing: "1px",
          background: "linear-gradient(90deg, #B57EDC, #000000)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          // Font size is responsive
          fontSize: { xs: "24px", sm: "32px", md: "38px" } 
        }}
      >
        WHY CHOOSE US?
      </Typography>

      {/* Subtitle */}
      <Typography sx={{ color: "#444", mb: { xs: 4, md: 6 } }}>
        We have enough reasons for you to choose our excellence services.
      </Typography>

      {/* Features Cards Container */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: "20px", md: "30px" }, // Responsive gap
        }}
      >
        {features.map((feature, index) => (
          // The motion.div now controls the flex layout item behavior
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{

                flexGrow: 1, 
                flexBasis: '100%', 
                '@media (minWidth: 960px)': { 
                    flexBasis: 'calc(50% - 15px)', // 50% width minus half the gap (30px/2)
                },
                maxWidth: "555px", 
                minWidth: "300px", 
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: "20px", md: "25px 30px" }, // Responsive padding
                borderRadius: "20px",
                backgroundColor: "white",
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
                height: "100%",
                textAlign: "left"
              }}
            >
              {/* Icon with Gradient */}
              <Box
                sx={{
                  // Icon size is responsive
                  fontSize: { xs: "40px", md: "45px" }, 
                  color: "#B57EDC",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  width: { xs: "50px", md: "60px" }, 
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  flexShrink: 0 // Prevent icon from shrinking
                }}
              >
                <feature.icon fontSize="inherit" />
              </Box>

              {/* Vertical Divider Line */}
              <Box
                sx={{
                  width: "2px",
                  minHeight: "100%", 
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  mx: { xs: "15px", md: "20px" }, // Responsive horizontal margin
                }}
              />

              {/* Text Content */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    background: "linear-gradient(90deg, #B57EDC, #000000)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "16px", md: "20px" } // Responsive title size
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: "#555", lineHeight: 1.7, fontSize: { xs: 14, md: 15 } }}>
                  {feature.description}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default WhyChooseUs;