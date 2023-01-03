import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import MetricsTopWatchersList from "@/components/metrics/metrics-top-watchers-list.vue";
import type { User } from "@/database/database";
import { faker } from "@faker-js/faker";
import MetricsPositionCard from "@/components/metrics/metrics-position-card.vue";
import MetricsPictureNameCard from "@/components/metrics/metrics-picture-name-card.vue";

describe("Deve testar a implementação do metrics-top-watchers-list", () => {
  let fakeData: { user: User; views: number }[] = [];

  beforeEach(() => {
    for (let index = 0; index < 10; index++) {
      fakeData.push({
        user: {
          name: faker.name.fullName(),
          email: faker.internet.email(),
          password: "",
          picture: new Blob(),
          id: index,
          preferences: new Map(),
        },
        views: parseInt(faker.random.numeric(5)),
      });
    }
  });

  afterEach(() => {
    fakeData = [];
  });

  it("Deve testar se o título é renderizado", () => {
    const wrapper = mount(MetricsTopWatchersList, { props: { users: [] } });

    expect(wrapper.text()).toContain("Users who watched the most movies");
  });

  it("Deve testar o componente é renderizado vazio", () => {
    const wrapper = mount(MetricsTopWatchersList, { props: { users: [] } });
    expect(wrapper.find("ul").element.children.length).toBe(0);
  });

  it("Deve testar se o componente renderiza os parametros na ordem certa", async () => {
    const wrapper = mount(MetricsTopWatchersList, {
      props: { users: fakeData },
    });

    const sortedFakeData = fakeData.sort((a, b) => a.views - b.views).reverse();

    wrapper.findAll("li").forEach((element, index) => {
      const name = sortedFakeData[index].user.name;
      const position = index + 1;

      const MetricsPicture = element.findComponent(MetricsPictureNameCard);
      const MetricsPosition = element.findComponent(MetricsPositionCard);

      expect(MetricsPicture.props()).toHaveProperty("name", name);
      expect(MetricsPosition.props()).toHaveProperty("position", position);
    });
  });
});
