import Colors from '@/constants/Colors';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PredefinedMessages = [
  { title: "Summarize meeting notes", text: "Create a clear summary of this meeting and list action items." },
  { title: "Draft an invoice", text: "Generate a professional invoice for a client with 3 items and tax included." },
  { title: "Business research", text: "Find and summarize 3 recent articles about AI trends in small businesses." },
  { title: "Email assistant", text: "Write a polite follow-up email to a client about an unpaid invoice." },
  { title: "Quick contract review", text: "Explain this contract clause in simple terms for a non-legal person." },
  { title: "Task planning", text: "Suggest a daily schedule for a team of 5 working on a marketing campaign." },
  { title: "Financial insight", text: "Analyze last quarter's sales numbers and highlight key trends." },
  { title: "Team announcement", text: "Write a short message to announce a new policy update to all employees." }
];

type Props = {
  onSelectCard: (message: string) => void;
};

const MessageIdeas = ({ onSelectCard }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 16,
        }}>
        {PredefinedMessages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onSelectCard(`${item.title} ${item.text}`)}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
            <Text style={{ color: Colors.grey, fontSize: 14 }}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 14,
    borderRadius: 10,
    width: 220,
  },
});
export default MessageIdeas;
