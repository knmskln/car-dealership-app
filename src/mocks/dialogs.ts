import {users} from "@/mocks/users";

export const dialogs = [
  {
    id: 1,
    companionUsername: 'gleb',
    participants: users.filter(user => user.id === 1 || user.id === 2),
    messages: [
      {
        id: 7,
        dialogId: 1,
        sendUserId: 2,
        text: '8f3366a5113f4488230a670179a70b0a75b1a87b9d60c6a3d99a7667d04a9428aee79b360b7795c841fc72d5766b29282afd7e675837a5b3b1354a'
      },
    ],
  },
  {
    id: 2,
    companionUsername: 'alena',
    participants: users.filter(user => user.id === 3 || user.id === 2),
    messages: [
      {
        id: 9,
        dialogId: 2,
        sendUserId: 3,
        text: '8f10679f113f4189130a65f11bc86f5b27255811f00f9538d8a2766a202405295e409a050a4a6c55b8'
      },
    ],
  },
  // {
  //   id: 3,
  //   lastMessage: '',
  // },
  // {
  //   id: 4,
  //   lastMessage: '',
  // },
  // {
  //   id: 5,
  //   lastMessage: '',
  // },
  // {
  //   id: 6,
  //   lastMessage: '',
  // },
  // {
  //   id: 7,
  //   lastMessage: '',
  // },
  // {
  //   id: 8,
  //   lastMessage: '',
  // },
  // {
  //   id: 9,
  //   lastMessage: '',
  // },
  // {
  //   id: 10,
  //   lastMessage: '',
  // },
  // {
  //   id: 11,
  //   lastMessage: '',
  // },
]
