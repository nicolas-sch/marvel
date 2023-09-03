import { mount } from '@vue/test-utils';
import MarvelCharacters from '@/components/MarvelCharacters.vue';

describe('MarvelCharacters.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(MarvelCharacters);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders character cards when characters are available', async () => {
    // Mock your store or provide the necessary data
    const characters = [
      { id: 1, name: 'Character 1', thumbnail: { path: 'path', extension: 'jpg' } },
      { id: 2, name: 'Character 2', thumbnail: { path: 'path', extension: 'jpg' } },
    ];

    const wrapper = mount(MarvelCharacters, {
      data() {
        return {
          characters: characters,
        };
      },
    });

    await wrapper.vm.$nextTick();

    const characterCards = wrapper.findAll('.character-card');
    expect(characterCards.length).toBe(characters.length);
  });

  it('filters characters when a character is selected', async () => {
    // Mock your store or provide the necessary data
    const characters = [
      { id: 1, name: 'Character 1', thumbnail: { path: 'path', extension: 'jpg' } },
      { id: 2, name: 'Character 2', thumbnail: { path: 'path', extension: 'jpg' } },
    ];

    const wrapper = mount(MarvelCharacters, {
      data() {
        return {
          characters: characters,
        };
      },
    });

    await wrapper.vm.$nextTick();

    // Simulate selecting a character
    const select = wrapper.find('#characterSelect');
    select.setValue('1');

    await wrapper.vm.$nextTick();

    // Check if the filtered character is displayed
    const characterCards = wrapper.findAll('.character-card');
    expect(characterCards.length).toBe(1);
    expect(characterCards.at(0).text()).toContain('Character 1');
  });
});
