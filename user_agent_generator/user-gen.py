import random

def generate_specific_user_agents():
    versions = ['129.0.6478.114', '129.0.6478.115', '129.0.6478.118']
    operating_systems = {
        'Windows': [
            'Windows NT 10.0; Win64; x64',
            'Windows NT 6.3; Win64; x64',
            'Windows NT 6.1; Win64; x64'
        ],
        'MacOS': [
            'Macintosh; Intel Mac OS X 10_15_7',
            'Macintosh; Intel Mac OS X 10_14_6',
            'Macintosh; Intel Mac OS X 10_13_6'
        ],
        'Linux': [
            'X11; Linux x86_64',
            'X11; Ubuntu; Linux x86_64; rv:89.0',
            'X11; Fedora; Linux x86_64; rv:89.0'
        ]
    }

    user_agents = []
    for os_type, os_list in operating_systems.items():
        for os in os_list:
            version = random.choice(versions)
            user_agent = f"Mozilla/5.0 ({os}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version} Safari/537.36"
            user_agents.append(user_agent)
    
    return user_agents

if __name__ == "__main__":
    user_agents = generate_specific_user_agents()
    with open('user_agents.txt', 'w') as file:
        for i, agent in enumerate(user_agents, 1):
            file.write(f"User Agent {i}: {agent}\n")
    print(f"{len(user_agents)} user agents have been saved to user_agents.txt")
