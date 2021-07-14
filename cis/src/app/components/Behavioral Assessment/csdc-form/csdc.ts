export class Csdc {
    valueArr: any[] = [
        { CareGiverName: 'Caregiver’s Name' },
        { CompletionDate: 'Date' },
        { StaffName: 'Administered by' },
        { StaffID: 'ID #' },
    ]
    child1ValueArr = [
        { ClientName: 'Client Name' },
        { Age_Client1: 'Age' },
        { Total_Client1: 'TOTAL SCORE Child 1' },
        { Sub_Total_Client1: 'SUB Total D (Sum scores on items 1-33) Child 1' },
        // { D2Total_Client1: 'SUB Total D (Sum 1-13) Child 1' },
        { CTotal_Client1: 'SUB TOTAL A Child 1' },
        { Client1ReferralID: 'Identified' },
        { ClientID1: 'Child 1' },
    ]
    child2ValueArr = [
        { Total_Client2: 'TOTAL SCORE Child 2' },
        { Sub_Total_Client2: 'SUB Total D (Sum scores on items 1-33) Child 2' },
        // { D2Total_Client2: 'SUB Total D (Sum 1-13) Child 2' },
        { CTotal_Client2: 'SUB TOTAL A Child 2' },
        { Client2ReferralID: 'Identified' },
        { ClientID2: 'Child 2' },
        { Age_Client2: 'Age' },
    ]
    child3ValueArr = [
        { ClientID3: 'Child 3' },
        { Age_Client3: 'Age' },
        { Client3ReferralID: 'Identified' },
        { Total_Client3: 'TOTAL SCORE Child 3' },
        { Sub_Total_Client3: 'SUB Total D (Sum scores on items 1-33) Child 3' },
        // { D2Total_Client3: 'SUB Total D (Sum 1-13) Child 3' },
        { CTotal_Client3: 'SUB TOTAL A Child 3' },
    ]
    child4ValueArr = [
        { ClientID4: 'Child 4' },
        { Age_Client4: 'Age' },
        { Client4ReferralID: 'Identified' },
        { CTotal_Client4: 'SUB TOTAL A Child 4' },
        // { D2Total_Client4: 'SUB Total D (Sum 1-13) Child 4' },
        { Sub_Total_Client4: 'SUB Total D (Sum scores on items 1-33) Child 4' },
        { Total_Client4: 'TOTAL SCORE Child 4' },
    ]
    optionIndex = [
        { CareGiverRelationToClient: 'Relationship to Child' }
    ]
    child4OptionIndex = [
        { CSDC_KS_PartD_Question18_Client4: 'Does your child avoid talking about the event? Child 4' },
        { CSDC_KS_PartD_Question19_Client4: 'Does your child have bad dreams? Child 4' },
        { CSDC_KS_PartD_Question20_Client4: 'Does your child have difficulty performing activities such as schoolwork or chores? Child 4' },
        { CSDC_KS_PartD_Question21_Client4: 'Does your child’s play seem to be about the event (For example, does your child express what happened to them with toys, games, drawings, or other fantasy-play)? Child 4' },
        { CSDC_KS_PartD_Question22_Client4: 'Does your child seem slowed down? For example, it takes your child a long time to respond to things Child 4' },
        { CSDC_KS_PartD_Question23_Client4: 'Do your child’s surroundings (at home, neighborhood, school) seem different to him/her than it used to? For example, things look or sound different Child 4' },
        { CSDC_KS_PartD_Question24_Client4: 'Does your child avoid people who remind him/her child of what happened? Child 4' },
        { CSDC_KS_PartD_Question25_Client4: 'Does your child have trouble concentrating? Child 4' },
        { CSDC_KS_PartD_Question26_Client4: 'Does your child try not to think about what happened? Child 4' },
        { CSDC_KS_PartD_Question27_Client4: 'Is your child doing anything dangerous or self-destructive? Child 4' },
        { CSDC_KS_PartD_Question28_Client4: 'Does it seem like your child is on the lookout for possible threats or signs of danger? Child 4' },
        { CSDC_KS_PartD_Question29_Client4: 'Has your child started feeling negatively about his/herself or his/her future? Child 4' },
        { CSDC_KS_PartD_Question30_Client4: 'Are your child’s thoughts or beliefs about what caused the event inaccurate, or causing him/her to wrongly blame him/herself or others for what happened? Child 4' },
        { CSDC_KS_PartD_Question31_Client4: 'Does your child often feel fearful, angry, guilty or ashamed? Child 4' },
        { CSDC_KS_PartD_Question32_Client4: 'Is your child less interested or seem less happy from doing the activities that he or she used to enjoy? Child 4' },
        { CSDC_KS_PartD_Question33_Client4: 'Has your child’s ability to have positive emotions such as happiness, or loving feelings decreased? Child 4' },
        { CSDC_KS_PartC_Question1_Client4: 'Does your child complain about headaches, stomachaches, nausea, difficulty breathing when he/she is reminded of what happened? Child 4' },
        { CSDC_KS_PartC_Question2_Client4: 'Does your child avoid doing things that remind him/her of what happened? Child 4' },
        { CSDC_KS_PartC_Question3_Client4: 'Does your child startle easily. For example, he or she jumps when he/she hears sudden or loud noises? Child 4' },
        { CSDC_KS_PartC_Question4_Client4: 'Does your child get very upset if reminded of what happened? Child 4' },
        { CSDC_KS_PartD_Question1_Client4: 'Does your child have uncomfortable memories of the event? Child 4' },
        { CSDC_KS_PartD_Question2_Client4: 'Does your child feel numb or distant from their feelings? Child 4' },
        { CSDC_KS_PartD_Question3_Client4: 'Is your child irritable or angry? Child 4' },
        { CSDC_KS_PartD_Question4_Client4: 'Does your child have difficulty remembering details about the event? Child 4' },
        { CSDC_KS_PartD_Question5_Client4: 'Does your child have difficulty falling asleep or staying asleep? Child 4' },
        { CSDC_KS_PartD_Question6_Client4: 'Does your child feel detached or distant from other people? Child 4' },
        { CSDC_KS_PartD_Question7_Client4: 'Has your child been having difficulty getting along with friends, schoolmates or teachers? Child 4' },
        { CSDC_KS_PartD_Question8_Client4: 'Does your child do things that he/she had outgrown? For example, thumb sucking, bedwetting, nail biting, or requesting to sleep with parents Child 4' },
        { CSDC_KS_PartD_Question9_Client4: 'Does your child feel as if the event were happening again? Child 4' },
        { CSDC_KS_PartD_Question10_Client4: 'Does your child feel restless and have trouble sitting still? Child 4' },
        { CSDC_KS_PartD_Question11_Client4: 'Does your child avoid going to places that remind him/her of what happened? Child 4' },
        { CSDC_KS_PartD_Question12_Client4: 'Has your child been having difficulty getting along with family members? Child 4' },
        { CSDC_KS_PartD_Question13_Client4: 'Has your child been confused about things that he/she should know? Child 4' },
        { CSDC_KS_PartD_Question14_Client4: 'Does your child feel “on edge” or nervous? Child 4' },
        { CSDC_KS_PartD_Question15_Client4: 'Does your child seem to feel “spaced out” or in a daze? Child 4' },
        { CSDC_KS_PartD_Question16_Client4: 'Does your child act as if the event were happening again? Child 4' },
        { CSDC_KS_PartD_Question17_Client4: 'Does your child have trouble keeping track of time Child 4' }
    ]
    child3OptionIndex = [
        { CSDC_KS_PartC_Question1_Client3: 'Does your child complain about headaches, stomachaches, nausea, difficulty breathing when he/she is reminded of what happened? Child 3' },
        { CSDC_KS_PartD_Question33_Client3: 'Has your child’s ability to have positive emotions such as happiness, or loving feelings decreased? Child 3' },
        { CSDC_KS_PartD_Question32_Client3: 'Is your child less interested or seem less happy from doing the activities that he or she used to enjoy? Child 3' },
        { CSDC_KS_PartD_Question31_Client3: 'Does your child often feel fearful, angry, guilty or ashamed? Child 3' },
        { CSDC_KS_PartD_Question30_Client3: 'Are your child’s thoughts or beliefs about what caused the event inaccurate, or causing him/her to wrongly blame him/herself or others for what happened? Child 3' },
        { CSDC_KS_PartD_Question29_Client3: 'Has your child started feeling negatively about his/herself or his/her future? Child 3' },
        { CSDC_KS_PartD_Question28_Client3: 'Does it seem like your child is on the lookout for possible threats or signs of danger? Child 3' },
        { CSDC_KS_PartD_Question27_Client3: 'Is your child doing anything dangerous or self-destructive? Child 3' },
        { CSDC_KS_PartD_Question26_Client3: 'Does your child try not to think about what happened? Child 3' },
        { CSDC_KS_PartD_Question25_Client3: 'Does your child have trouble concentrating? Child 3' },
        { CSDC_KS_PartD_Question24_Client3: 'Does your child avoid people who remind him/her child of what happened? Child 3' },
        { CSDC_KS_PartD_Question23_Client3: 'Do your child’s surroundings (at home, neighborhood, school) seem different to him/her than it used to? For example, things look or sound different Child 3' },
        { CSDC_KS_PartD_Question22_Client3: 'Does your child seem slowed down? For example, it takes your child a long time to respond to things Child 3' },
        { CSDC_KS_PartD_Question21_Client3: 'Does your child’s play seem to be about the event (For example, does your child express what happened to them with toys, games, drawings, or other fantasy-play)? Child 3' },
        { CSDC_KS_PartD_Question20_Client3: 'Does your child have difficulty performing activities such as schoolwork or chores? Child 3' },
        { CSDC_KS_PartD_Question19_Client3: 'Does your child have bad dreams? Child 3' },
        { CSDC_KS_PartD_Question18_Client3: 'Does your child avoid talking about the event? Child 3' },
        { CSDC_KS_PartD_Question17_Client3: 'Does your child have trouble keeping track of time Child 3' },
        { CSDC_KS_PartD_Question16_Client3: 'Does your child act as if the event were happening again? Child 3' },
        { CSDC_KS_PartD_Question15_Client3: 'Does your child seem to feel “spaced out” or in a daze? Child 3' },
        { CSDC_KS_PartD_Question14_Client3: 'Does your child feel “on edge” or nervous? Child 3' },
        { CSDC_KS_PartD_Question13_Client3: 'Has your child been confused about things that he/she should know? Child 3' },
        { CSDC_KS_PartD_Question12_Client3: 'Has your child been having difficulty getting along with family members? Child 3' },
        { CSDC_KS_PartD_Question11_Client3: 'Does your child avoid going to places that remind him/her of what happened? Child 3' },
        { CSDC_KS_PartD_Question10_Client3: 'Does your child feel restless and have trouble sitting still? Child 3' },
        { CSDC_KS_PartD_Question9_Client3: 'Does your child feel as if the event were happening again? Child 3' },
        { CSDC_KS_PartD_Question8_Client3: 'Does your child do things that he/she had outgrown? For example, thumb sucking, bedwetting, nail biting, or requesting to sleep with parents Child 3' },
        { CSDC_KS_PartD_Question7_Client3: 'Has your child been having difficulty getting along with friends, schoolmates or teachers? Child 3' },
        { CSDC_KS_PartD_Question6_Client3: 'Does your child feel detached or distant from other people? Child 3' },
        { CSDC_KS_PartD_Question5_Client3: 'Does your child have difficulty falling asleep or staying asleep? Child 3' },
        { CSDC_KS_PartD_Question4_Client3: 'Does your child have difficulty remembering details about the event? Child 3' },
        { CSDC_KS_PartD_Question3_Client3: 'Is your child irritable or angry? Child 3' },
        { CSDC_KS_PartD_Question2_Client3: 'Does your child feel numb or distant from their feelings? Child 3' },
        { CSDC_KS_PartD_Question1_Client3: 'Does your child have uncomfortable memories of the event? Child 3' },
        { CSDC_KS_PartC_Question3_Client3: 'Does your child startle easily. For example, he or she jumps when he/she hears sudden or loud noises? Child 3' },
        { CSDC_KS_PartC_Question2_Client3: 'Does your child avoid doing things that remind him/her of what happened? Child 3' },
    ]
    child2OptionIndex = [
        { CSDC_KS_PartC_Question1_Client2: 'Does your child complain about headaches, stomachaches, nausea, difficulty breathing when he/she is reminded of what happened? Child 2' },
        { CSDC_KS_PartD_Question33_Client2: 'Has your child’s ability to have positive emotions such as happiness, or loving feelings decreased? Child 2' },
        { CSDC_KS_PartD_Question32_Client2: 'Is your child less interested or seem less happy from doing the activities that he or she used to enjoy? Child 2' },
        { CSDC_KS_PartD_Question31_Client2: 'Does your child often feel fearful, angry, guilty or ashamed? Child 2' },
        { CSDC_KS_PartD_Question30_Client2: 'Are your child’s thoughts or beliefs about what caused the event inaccurate, or causing him/her to wrongly blame him/herself or others for what happened? Child 2' },
        { CSDC_KS_PartD_Question29_Client2: 'Has your child started feeling negatively about his/herself or his/her future? Child 2' },
        { CSDC_KS_PartD_Question28_Client2: 'Does it seem like your child is on the lookout for possible threats or signs of danger? Child 2' },
        { CSDC_KS_PartD_Question27_Client2: 'Is your child doing anything dangerous or self-destructive? Child 2' },
        { CSDC_KS_PartD_Question26_Client2: 'Does your child try not to think about what happened? Child 2' },
        { CSDC_KS_PartD_Question25_Client2: 'Does your child have trouble concentrating? Child 2' },
        { CSDC_KS_PartD_Question24_Client2: 'Does your child avoid people who remind him/her child of what happened? Child 2' },
        { CSDC_KS_PartD_Question23_Client2: 'Do your child’s surroundings (at home, neighborhood, school) seem different to him/her than it used to? For example, things look or sound different Child 2' },
        { CSDC_KS_PartD_Question22_Client2: 'Does your child seem slowed down? For example, it takes your child a long time to respond to things Child 2' },
        { CSDC_KS_PartD_Question21_Client2: 'Does your child’s play seem to be about the event (For example, does your child express what happened to them with toys, games, drawings, or other fantasy-play)? Child 2' },
        { CSDC_KS_PartD_Question20_Client2: 'Does your child have difficulty performing activities such as schoolwork or chores? Child 2' },
        { CSDC_KS_PartD_Question19_Client2: 'Does your child have bad dreams? Child 2' },
        { CSDC_KS_PartD_Question18_Client2: 'Does your child avoid talking about the event? Child 2' },
        { CSDC_KS_PartD_Question17_Client2: 'Does your child have trouble keeping track of time Child 2' },
        { CSDC_KS_PartD_Question16_Client2: 'Does your child act as if the event were happening again? Child 2' },
        { CSDC_KS_PartD_Question15_Client2: 'Does your child seem to feel “spaced out” or in a daze? Child 2' },
        { CSDC_KS_PartD_Question14_Client2: 'Does your child feel “on edge” or nervous? Child 2' },
        { CSDC_KS_PartD_Question13_Client2: 'Has your child been confused about things that he/she should know? Child 2' },
        { CSDC_KS_PartD_Question12_Client2: 'Has your child been having difficulty getting along with family members? Child 2' },
        { CSDC_KS_PartD_Question11_Client2: 'Does your child avoid going to places that remind him/her of what happened? Child 2' },
        { CSDC_KS_PartD_Question10_Client2: 'Does your child feel restless and have trouble sitting still? Child 2' },
        { CSDC_KS_PartD_Question9_Client2: 'Does your child feel as if the event were happening again? Child 2' },
        { CSDC_KS_PartD_Question8_Client2: 'Does your child do things that he/she had outgrown? For example, thumb sucking, bedwetting, nail biting, or requesting to sleep with parents Child 2' },
        { CSDC_KS_PartD_Question7_Client2: 'Has your child been having difficulty getting along with friends, schoolmates or teachers? Child 2' },
        { CSDC_KS_PartD_Question6_Client2: 'Does your child feel detached or distant from other people? Child 2' },
        { CSDC_KS_PartD_Question5_Client2: 'Does your child have difficulty falling asleep or staying asleep? Child 2' },
        { CSDC_KS_PartD_Question4_Client2: 'Does your child have difficulty remembering details about the event? Child 2' },
        { CSDC_KS_PartD_Question3_Client2: 'Is your child irritable or angry? Child 2' },
        { CSDC_KS_PartD_Question2_Client2: 'Does your child feel numb or distant from their feelings? Child 2' },
        { CSDC_KS_PartD_Question1_Client2: 'Does your child have uncomfortable memories of the event? Child 2' },
        { CSDC_KS_PartC_Question4_Client2: 'Does your child get very upset if reminded of what happened? Child 2' },
        { CSDC_KS_PartC_Question3_Client2: 'Does your child startle easily. For example, he or she jumps when he/she hears sudden or loud noises? Child 2' },
        { CSDC_KS_PartC_Question2_Client2: 'Does your child avoid doing things that remind him/her of what happened? Child 2' },
    ]
    child1OptionIndex = [
        { CSDC_KS_PartC_Question1_Client1: 'Does your child complain about headaches, stomachaches, nausea, difficulty breathing when he/she is reminded of what happened? Child 1' },
        { CSDC_KS_PartD_Question33_Client1: 'Has your child’s ability to have positive emotions such as happiness, or loving feelings decreased? Child 1' },
        { CSDC_KS_PartD_Question32_Client1: 'Is your child less interested or seem less happy from doing the activities that he or she used to enjoy? Child 1' },
        { CSDC_KS_PartD_Question31_Client1: 'Does your child often feel fearful, angry, guilty or ashamed? Child 1' },
        { CSDC_KS_PartD_Question30_Client1: 'Are your child’s thoughts or beliefs about what caused the event inaccurate, or causing him/her to wrongly blame him/herself or others for what happened? Child 1' },
        { CSDC_KS_PartD_Question29_Client1: 'Has your child started feeling negatively about his/herself or his/her future? Child 1' },
        { CSDC_KS_PartD_Question28_Client1: 'Does it seem like your child is on the lookout for possible threats or signs of danger? Child 1' },
        { CSDC_KS_PartD_Question27_Client1: 'Is your child doing anything dangerous or self-destructive? Child 1' },
        { CSDC_KS_PartD_Question26_Client1: 'Does your child try not to think about what happened? Child 1' },
        { CSDC_KS_PartD_Question25_Client1: 'Does your child have trouble concentrating? Child 1' },
        { CSDC_KS_PartD_Question24_Client1: 'Does your child avoid people who remind him/her child of what happened? Child 1' },
        { CSDC_KS_PartD_Question23_Client1: 'Do your child’s surroundings (at home, neighborhood, school) seem different to him/her than it used to? For example, things look or sound different Child 1' },
        { CSDC_KS_PartD_Question22_Client1: 'Does your child seem slowed down? For example, it takes your child a long time to respond to things Child 1' },
        { CSDC_KS_PartD_Question21_Client1: 'Does your child’s play seem to be about the event (For example, does your child express what happened to them with toys, games, drawings, or other fantasy-play)? Child 1' },
        { CSDC_KS_PartD_Question20_Client1: 'Does your child have difficulty performing activities such as schoolwork or chores? Child 1' },
        { CSDC_KS_PartD_Question19_Client1: 'Does your child have bad dreams? Child 1' },
        { CSDC_KS_PartD_Question18_Client1: 'Does your child avoid talking about the event? Child 1' },
        { CSDC_KS_PartD_Question17_Client1: 'Does your child have trouble keeping track of time Child 1' },
        { CSDC_KS_PartD_Question16_Client1: 'Does your child act as if the event were happening again? Child 1' },
        { CSDC_KS_PartD_Question15_Client1: 'Does your child seem to feel “spaced out” or in a daze? Child 1' },
        { CSDC_KS_PartD_Question14_Client1: 'Does your child feel “on edge” or nervous? Child 1' },
        { CSDC_KS_PartC_Question2_Client1: 'Does your child avoid doing things that remind him/her of what happened? Child 1' },
        { CSDC_KS_PartD_Question12_Client1: 'Has your child been having difficulty getting along with family members? Child 1' },
        { CSDC_KS_PartD_Question11_Client1: 'Does your child avoid going to places that remind him/her of what happened? Child 1' },
        { CSDC_KS_PartD_Question10_Client1: 'Does your child feel restless and have trouble sitting still? Child 1' },
        { CSDC_KS_PartD_Question9_Client1: 'Does your child feel as if the event were happening again? Child 1' },
        { CSDC_KS_PartD_Question8_Client1: 'Does your child do things that he/she had outgrown? For example, thumb sucking, bedwetting, nail biting, or requesting to sleep with parents Child 1' },
        { CSDC_KS_PartD_Question7_Client1: 'Has your child been having difficulty getting along with friends, schoolmates or teachers? Child 1' },
        { CSDC_KS_PartD_Question6_Client1: 'Does your child feel detached or distant from other people? Child 1' },
        { CSDC_KS_PartD_Question5_Client1: 'Does your child have difficulty falling asleep or staying asleep? Child 1' },
        { CSDC_KS_PartD_Question4_Client1: 'Does your child have difficulty remembering details about the event? Child 1' },
        { CSDC_KS_PartD_Question3_Client1: 'Is your child irritable or angry? Child 1' },
        { CSDC_KS_PartD_Question2_Client1: 'Does your child feel numb or distant from their feelings? Child 1' },
        { CSDC_KS_PartD_Question1_Client1: 'Does your child have uncomfortable memories of the event? Child 1' },
        { CSDC_KS_PartC_Question4_Client1: 'Does your child get very upset if reminded of what happened? Child 1' },
        { CSDC_KS_PartC_Question3_Client1: 'Does your child startle easily. For example, he or she jumps when he/she hears sudden or loud noises? Child 1' },
    ]
}